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

  async readIPFS(data: string) {
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
    
    const result = client.cat(data);
    console.log(result);
    
    for await (const chunk of client.cat(data)) {
      console.log(chunk);
      const result = Buffer.from(chunk).toString();

      console.log(result);
    }
    
    return "something went wrong"
  },
};
