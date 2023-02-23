interface PublisherAccount{
    name: string //this is an address, 
    adSpaces: AdSpace[]
    balance: number
}

interface AdSpace{
    id: number,
    name: string,
    active: boolean,
    verified: boolean,
    description: string,
    image: string,
    price: number,
    owner: string,
    ads: Ad[]
}

interface Ad{
    owner: string, 
    totalSupply: number,
    addresses: string[],
}