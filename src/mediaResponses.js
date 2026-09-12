const fs = require('fs');
const path = require('path');

const getMedia = (request, response, file, contentType) => {
    fs.stat(file,(err, stats) => {
        // Error check
        if(err){
            if(err.code === "ENOENT"){
                response.writeHead(404);
            }
            return response.end(err);
        }

        // Load a particular range of bytes from file
        let { range } = request.headers;

        if (!range){
            range = 'bytes=0-';
        }

        const positions = range.replace(/bytes=/, '').split('-');

        let start = parseInt(positions, 10);
        
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1]) : total - 1;

        if (start > end)
        {
            start = end - 1;
        }

        // Determine chunk size
        const chunkSize = (end - start) + 1;

        // 206 means "partial content"
        response.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': contentType
        })

        // Create a file stream to load only the amount of the file necessary
        const stream = fs.createReadStream(file, {start, end});

        // On stream open
        stream.on('open', () => {
            stream.pipe(response); // Pipe the file stream directly to the response
        })

        stream.on('error', (streamErr) => {
            response.end(streamErr);
        })
    })
};

const getParty = (request, response) => {
    const file = path.resolve(__dirname, '../client/party.mp4');

    return getMedia(request,response, file, 'video/mp4');
};

const getBling = (request, response) => {
    const file = path.resolve(__dirname, '../client/bling.mp3');

    return getMedia(request, response, file, 'audio/mpeg');
}

const getBird = (request, response) => {
    const file = path.resolve(__dirname, '../client/bird.mp4');

    return getMedia(request, response, file, 'video/mp4');
}

module.exports = {getParty, getBling, getBird};