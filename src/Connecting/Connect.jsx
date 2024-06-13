import {useState, useEffect} from 'react';

export default function Connect(){


    // GET Constants

    const URL = "http://localhost:5068/api/Category";
    const [records,setValues] = useState([])

    // POST Constants

    const [Updname, setName] = useState('')
    const [Updnumber, setNumber] = useState('')

    // When the Application Runs or Re-Rendered
    useEffect(() => { GetAPI()},[])

    
    //#REST METHODS:

    async function GetAPI()
    {

        const result = await fetch(URL);
        const json = await result.json();
        setValues(json);
    }

    async function PostAPI()
    {

        const result = await fetch(URL,{
            method:"POST",
            body:JSON.stringify({
                name:Updname,
                number:Updnumber
            }),
            headers:{"Content-type":"Application/json"}
        })

        if (result.ok){
            await GetAPI();
        }
    }

    async function PutAPI(id){

        const putName = prompt("Your Name..")
        const putNumber = prompt("Your Number..")

        await fetch(URL,{
            method:"PUT",
            body:JSON.stringify({
                id:id,
                name:putName,
                number:putNumber
            }),
            headers:{'Content-type':"Application/json"}
        })

        await GetAPI();

        
    }

    async function DeleteAPI(id){

        await fetch(URL+`/${id}`, {
                            method: 'DELETE',
                            })
        
        await GetAPI();
    }

    //#endregion


    return( 
    
    <>
        <ol>
            {records.map((e,index) => <li key={index}> {e.name} {e.number}  
            <button onClick={()=>PutAPI(e.id)}> EDIT </button>
            <button onClick={()=>DeleteAPI(e.id)} >DEL</button>
            </li>)}
        </ol>

        <input type="text" value={Updname} onChange={(e) => setName(e.target.value)}  placeholder='Enter name..' /> <br />
        <input type="text" value={Updnumber} onChange={(e) => setNumber(e.target.value)} placeholder='Enter number..' /> <br />
        <button type='submit'onClick={()=> PostAPI() } >Submit</button>
    </>
    )
}