import React from "react";
import {firebase} from '../firebase'
import {nanoid} from 'nanoid';

const Formulario =()=>{
    const[pokemon, setPokemon] =React.useState('')
    const[descripcion, setDescripcion]=React.useState('')
    const[tipo1, setTipo1]=React.useState('')
    const[tipo2, setTipo2]=React.useState('')
    const[region, setRegion]=React.useState('')
    const[debilidad, setDebilidad]=React.useState('')
    const[ataquePrincipal, setAtaquePrincipal]=React.useState('')
    const[lista, setLista]=React.useState([])
    const[modoEdicion, setModoEdicion]=React.useState(false)
    const[id, setId]=React.useState('')
    const[error, setError]=React.useState(null)


    React.useEffect(()=>{
     const obtenerDatos = async()=>{
        try {
            const db = firebase.firestore()
            const data = await db.collection('pokemon')
            const array = data.docs.map(item=>(
                {
                    id:item.id, ...item.data()
                }
            ))
            setLista(array)
        } catch (error) {
            console.log(error)
        }
    }
    obtenerDatos()
})

const guardarDatos = async (e)=>{
    e.preventDefault()
    if(!pokemon.trim()){
        setError('campo pokemon vacio')
        return
        
    }
    if(!descripcion.trim()){
        setError('campo descripcion vacio')
         return
    }
    if(!tipo1.trim()){
        setError('campo tipo1 vacio')
        return
        
    }
    if(!tipo2.trim()){
        setError('campo tipo2 vacio')
         return
    }
    if(!region.trim()){
        setError('campo region vacio')
        return
        
    }
    if(!debilidad.trim()){
        setError('campo debilidad vacio')
         return
    }
    if(!ataquePrincipal.trim()){
        setError('campo ataque principal vacio')
         return
    }
    try {
        const db = firebase.firestore()
        const nuevoPokemon={
            nombrePokemon:pokemon,
            nombreDescripcion:descripcion,
            nombreTipo1:tipo1,
            nombreTipo2:tipo2,
            nombreRegion:region,
            nombreDebilidad:debilidad,
            nombreAtaquePrincipal:ataquePrincipal
        }
        await db.collection('pokemon').add(nuevoPokemon)
        setLista([...lista,
            {id:nanoid(), nombrePokemon:pokemon, nombreDescripcion: descripcion, nombreTipo1:tipo1,
                nombreTipo2:tipo2, nombreRegion:region, nombreDebilidad:debilidad, nombreAtaquePrincipal:ataquePrincipal}
        ])
    } catch (error) {
        console.log(error)
    }
    setModoEdicion(false)
    setPokemon('')
    setDescripcion('')
    setTipo1('')
    setTipo2('')
    setRegion('')
    setDebilidad('')
    setAtaquePrincipal('')
    setError(null)
}
    const eliminar =async(id)=>{
            try {
                const db = firebase.firestore()
                await db.collection('pokemon').doc(id).delete()
                const aux = lista.filter(item=>item.id !==id)
                setLista(aux)
            } catch (error) {
                console.log(error)
            }
        
    }
    const auxEditar =(item)=>{
        setPokemon(item.nombrePokemon)
        setDescripcion(item.nombreDescripcion)
        setTipo1(item.nombreTipo1)
        setTipo2(item.nombreTipo2)
        setRegion(item.nombreRegion)
        setDebilidad(item.nombreDebilidad)
        setAtaquePrincipal(item.nombreAtaquePrincipal)
        setModoEdicion(true)
        setId(item.id)
    }
    const editar=async e=>{
        e.preventDefault()
        if(!pokemon.trim()){
            setError('campo fruta vacio')
            return
            
        }
        if(!descripcion.trim()){
            setError('campo descripcion vacio')
             return
        }
        if(!tipo1.trim()){
            setError('campo tipo1 vacio')
            return
            
        }
        if(!tipo2.trim()){
            setError('campo tipo2 vacio')
             return
        }
        if(!region.trim()){
            setError('campo region vacio')
            return
            
        }
        if(!debilidad.trim()){
            setError('campo debilidad vacio')
             return
        }
        if(!ataquePrincipal.trim()){
            setError('campo ataque principal vacio')
             return
        }
        try {
            const db = firebase.firestore()
            await db.collection('pokemon').doc(id).update({
                nombrePokemon:pokemon,
                nombreDescripcion:descripcion,
                nombreTipo1:tipo1,
                nombreTipo2:tipo2,
                nombreRegion:region,
                nombreDebilidad:debilidad,
                nombreAtaquePrincipal:ataquePrincipal
            })
            
        } catch (error) {
            console.log(error)
        }
        setModoEdicion(false)
        setPokemon('')
        setDescripcion('')
        setTipo1('')
        setTipo2('')
        setRegion('')
        setDebilidad('')
        setAtaquePrincipal('')
        setError(null)
    }

   const cancelar=()=>{
        setModoEdicion(false)
        setPokemon('')
        setDescripcion('')
        setTipo1('')
        setTipo2('')
        setRegion('')
        setDebilidad('')
        setAtaquePrincipal('')
        setError(null)
   } 

   return(
    <div className="=container mt-9">
        <h1 className="=text-center">MAESTRO POKEMON</h1>
        <hr/>
        <div className="row">
            <div className="col-9">
                <h4 className="text-center">Listado Pokemon</h4>
                <ul className="list-group">
                {   
                        lista.map((item)=>(
                            <li className="list-group-item" key={item.id}>
                            <span className="lead">{item.nombrepokemon}-{item.nombreDescripcion}-{item.nombreTipo1}-{item.nombreTipo2}-
                            {item.nombreRegion}-{item.nombreDebilidad}-{item.nombreAtaquePrincipal}</span>
                            <button className="btn btn-danger btn-sm float-end mx-2"onClick={()=>eliminar(item.id)}>Eliminar</button>
                                <button className="btn btn-warning btn-sm float-end"onClick={()=>auxEditar(item)}>Editar</button>
                            </li>
                        ))

                }                  
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar pokemon':'Agregar pokemon'
                    }</h4>
                    <form onSubmit={modoEdicion ? editar : guardarDatos}>
                        {
                            error ?<span className="text-danger">{error}</span>:null
                        }
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese Pokemon"
                        onChange={(e)=>setPokemon(e.target.value)}
                        value={pokemon}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese Descripcion"
                        onChange={(e)=>setDescripcion(e.target.value)}
                        value={descripcion}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese tipo 1"
                        onChange={(e)=>setTipo1(e.target.value)}
                        value={tipo1}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese tipo 2"
                        onChange={(e)=>setTipo2(e.target.value)}
                        value={tipo2}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese region"
                        onChange={(e)=>setRegion(e.target.value)}
                        value={region}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese debilidad"
                        onChange={(e)=>setDebilidad(e.target.value)}
                        value={debilidad}
                        />
                        <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese ataque principal"
                        onChange={(e)=>setAtaquePrincipal(e.target.value)}
                        value={ataquePrincipal}
                        />
                        {
                            !modoEdicion?(
                                <button className="btn btn-primary btn-block" type="submit">Agregar</button>
                            )
                            :
                            (<>

                            <button className="btn btn-warning btn-block" type="submit">Editar</button>
                            <button className="btn btn-dark btn-block mx-2" onClick={()=>cancelar}>Cancelar</button>
                            </>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Formulario