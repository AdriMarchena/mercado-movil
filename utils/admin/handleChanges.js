export function handleChangeDataStores(text, input, position, setDataStores) {
    setDataStores(current=>current.map((store)=>{
        if (store.index==position) {
          return {...store, 
            [input]: input === "document" ? text.replace(/[^0-9]/g, '') : text
          }
        }
        return store
    }))
}