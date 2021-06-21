export class AnimalAvatar {
    get bat(){
        return require('./animals/bat.svg') as string
    }
    get bear(){
        return require('./animals/bear.svg') as string
    }
    get fox(){
        return require('./animals/fox.svg') as string
    }
    get giraffe(){
        return require('./animals/giraffe.svg') as string
    }
    get gorilla(){
        return require('./animals/gorilla.svg') as string
    }
    get parrot(){
        return require('./animals/parrot.svg') as string
    }
    get penguin(){
        return require('./animals/penguin.svg') as string
    }
    get pufferfish(){
        return require('./animals/puffer-fish.svg') as string
    }
    get zebra(){
        return require('./animals/zebra.svg') as string
    }
    processUser = (type: string, name: string) =>{
        if (type === "animals"){
            if (name === "bat"){
                return this.bat;
            }else if (name === "bear"){
                return this.bear;
            }else if (name === "fox"){
                return this.fox;
            }else if (name === "giraffe"){
                return this.giraffe;
            }else if (name === "gorilla"){
                return this.gorilla;
            }else if (name === "parrot"){
                return this.parrot;
            }else if (name === "penguin"){
                return this.penguin;
            }else if (name === "pufferfish"){
                return this.pufferfish;
            }else if (name === "zebra"){
                return this.zebra;
            }
        }
        return this.bat;
    }
}