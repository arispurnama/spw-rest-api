import uploadFileMiddleware, { getFileName, setFileName } from "../middleware/upload.js";
import { v4 } from "uuid";
const uploadDir = "D:\\Tugas Akhir\\uploads\\";
const response = new Object();
import fs from "fs";


export const upload = async (req, res) => {
  try {
    //console.log('storag : ',uploadFile.storage.DiskStorage.getFilename().filename)
    await uploadFileMiddleware(req, res);
    let file = getFileName()
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    response.data = file;
    response.error = false;
    response.errorMessage = "Uploaded the file successfully!!!";
    res.status(200).send({ response });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      response.error = true;
      response.errorMessage = "File size cannot be larger than 2MB!";
      return res.status(500).send({ response});
    }
    console.log('error : ', err)
    response.error = true;
    response.errorMessage = `Could not upload the file`;
    return res.status(500).send({ response });
  }
};

export const getListFiles = (req, res) => {
  const directoryPath = uploadDir;

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: uploadDir + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

export const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = uploadDir;
  console.log("filename : ", fileName);
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

export const downloadStream = (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(uploadDir, fileName);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send({ message: "File not found." });
      }
      return res.status(500).send({ message: "Could not access the file. " + err });
    } 

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', stats.size);

    const readStream = fs.createReadStream(filePath);

    readStream.on('error', (err) => {
      res.status(500).send({ message: "Could not download the file. " + err });
    });

    readStream.pipe(res);
  });
};

