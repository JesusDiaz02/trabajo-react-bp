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
}

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
            {id:nanoid(), nombrePokemon:pokemon, nombreDescripcion: descripcion, nombreTipo1:tipo,
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


}