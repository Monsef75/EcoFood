const fs = require('fs')
const path = require('path')

async function cleanUnusedUploads(products) {
    try {
        const uploadDir = path.join(process.cwd(), 'uploads')
        const files = fs.readdirSync(uploadDir)

        const dbProducts = await products.find({}, { projection: { image: 1 } }).toArray()
        const usedFiles = new Set(
            dbProducts
                .map(p => p.image)
                .filter(Boolean)
                .map(img => path.basename(img))
        )

        files.forEach(file => {
            if (!usedFiles.has(file)) {
                const filePath = path.join(uploadDir, file)
                fs.unlink(filePath, err => {
                    if (err) console.log('failed to delete unused file', filePath, err)
                    else console.log('deleted unused file', filePath)
                })
            }
        })
    } catch (err) {
        console.log('cleanUnusedUploads failed', err)
    }
}

module.exports = { cleanUnusedUploads }