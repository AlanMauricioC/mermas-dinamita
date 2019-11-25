import React from 'react';
import { getSupplies } from "../../../../../../../services/supplies";
import { useDispatch} from "react-redux";
import {setSupplies} from '../../../../../../../actions'

export default function UpdateSp(){
    const dispatch=useDispatch()
    getSupplies('',null).then((suppliesData)=>{
        dispatch(setSupplies(suppliesData.supplies))
    })
    return(
        <div></div>
    );
}