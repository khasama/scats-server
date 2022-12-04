require("dotenv").config();
const { google } = require("googleapis");
const { Readable } = require('stream');
const Upload = {};

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

async function setFilePublic(fileId) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
    } catch (error) {
        (error);
    }
};

Upload.uploadFile = async (file, share) => {
    try {
        let type, folder;
        if (file.type === "webp") {
            type = `image/${file.type}`;
            folder = process.env.FOLDER_IMAGE;
        }
        const createFile = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: type,
                parents: [folder]
            },
            media: {
                mimeType: type,
                body: Readable.from(file.buffer)
            }
        });
        const fileId = createFile.data.id;
        if (share) await setFilePublic(fileId);
        return fileId;
    } catch (error) {
        ({ func: "upload drive", status: error.response.status, msg: error.response.statusText });
        throw error;
    }
};

Upload.uploadAvatar = async (file, share) => {
    try {
        let type, folder;
        if (file.type === "webp") {
            type = `image/${file.type}`;
            folder = process.env.FOLDER_USER;
            const createFile = await drive.files.create({
                requestBody: {
                    name: file.name,
                    mimeType: type,
                    parents: [folder]
                },
                media: {
                    mimeType: type,
                    body: Readable.from(file.buffer)
                }
            });
            const fileId = createFile.data.id;
            if (share) await setFilePublic(fileId);
            return fileId;
        }

    } catch (error) {
        ({ func: "upload drive", status: error.response.status, msg: error.response.statusText });
        throw error;
    }
};

Upload.deleteFile = async (fileId) => {
    try {
        const deleteFile = await drive.files.delete({ fileId });
        if (deleteFile.status === 204) {
            return true;
        }
    } catch (error) {
        ({ func: "delete drive", status: error.response.status, msg: error.response.statusText });
        throw error;
    }
};


module.exports = Upload;