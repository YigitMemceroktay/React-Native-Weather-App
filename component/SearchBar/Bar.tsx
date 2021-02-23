import React,{useState} from 'react'
import { View, Text } from 'react-native'
import {TextInput} from 'react-native-paper';
interface IAProps{

setState1:Function
}
interface IAState{
city:string
}
const Bar = ({setState1}:IAProps) => {
   const [city,setCity] = useState('');
    return (
        <TextInput label={"City Name"}
        theme={{colors:{primary:'#8648CC'}}}
        value={city}
        style={{backgroundColor:'white',width:'100%',paddingHorizontal:10,marginTop:50}}
        onChangeText={e=>{setState1(e); setCity(e)}}
        mode={'outlined'}
        />
    )
}

export default Bar
