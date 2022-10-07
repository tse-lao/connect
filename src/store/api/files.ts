import { create } from "ipfs-http-client";

export default {
  async uploadToIPFS(data: Object) {
    //make sure we upload it all to ipfs.
    //need to fix this credentials
    const id = import.meta.env.VITE_INFURA_ID;
    const key = import.meta.env.VITE_INFURA_SECRET_KEY;
    const auth: string =
      "Basic " + Buffer.from(id + ":" + key).toString("base64");
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    try {
      const upload = await client.add(data);
      console.log(upload);
      return upload.path;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async readIPFS(data) {
    const id = import.meta.env.VITE_INFURA_ID;
    const key = import.meta.env.VITE_INFURA_SECRET_KEY;
    const auth: string =
      "Basic " + Buffer.from(id + ":" + key).toString("base64");
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    for await (const file of client.cat("QmY9zf6Arto7sUqAPp6ik2xXBYSormMBH7pispPtaUmKqD")) {
      let utf8decoder = new TextDecoder();
      console.log(file)
      const decode = JSON.parse(utf8decoder.decode(file));
      console.log(decode);
    }
  }
};
