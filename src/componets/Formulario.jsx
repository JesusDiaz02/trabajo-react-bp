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