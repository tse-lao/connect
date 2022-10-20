import { CID, create } from "ipfs-http-client";

import { base64 } from "multiformats/bases/base64";





//base settings for ipfs
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
  }
});

export default {
  async uploadToIPFS(data: any) {
    try {
      const upload = await client.add(data);
      return upload.path;
    } catch (error) {
      return error;
    }
  },

  async readIPFS(data: any) {
    for await (const file of client.cat(data)) {
      let utf8decoder = new TextDecoder();
      const decode = JSON.parse(utf8decoder.decode(file));

      return decode;
    }
  },

  async createRepo(username: string) {
    //this creates a cid of the user_address which we should be able to retrieve at any time. 
    const result = await client.dag.put({ "user_address": username })
    const cidString = result.toString(base64.encoder);

  },
  async statRepo(cidString: string) {

    let newCid = CID.parse(cidString, base64);
    const result = await client.dag.get(newCid)
    console.log(result);
  },

  async createFolder(cidString: string, folderName: string, parentFolder: string) {

    let ownerCid = CID.parse(cidString, base64);

    const result = await client.dag.put({ "user_address": ownerCid, "parent": parentFolder, "name": folderName })

    const pinAdded = await client.pin.add(result)

    console.log(pinAdded);

    for await (const { cid, type } of client.pin.ls({ paths: [result] })) {
      console.log({ cid, type })
    }

    const newCidString = result.toString(base64.encoder);
    console.log(newCidString);
  },

  async dagResolve(cidString: string) {

    let ownerCid = CID.parse(cidString, base64)
    const result = await client.dag.resolve(ownerCid);
    console.log(result);
  },


};
