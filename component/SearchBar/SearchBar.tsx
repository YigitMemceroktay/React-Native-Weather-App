import React, { Component } from 'react'
import { Text, View,Image,TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import SwitchSelector from 'react-native-switch-selector';

import styles from './style';
import Bar from './Bar'
interface IAProps{
}

interface IAState{
city:string
initial:boolean,
temp:number,
humidity:number;
temp_min:number;
temp_max:number;
visibleText:string,
correct?:boolean,
feels_like:number;
isLoading:boolean;
id:string;
unit:number
}
export class SearchBar extends Component<IAProps,IAState> {
   
    constructor(props:IAProps){
        super(props);
        this.state={
            city:'',
            initial:true,
            temp:0,
            humidity:0,
            temp_min:0,
            temp_max:0,
            visibleText:'',
            correct:false,
            feels_like:0,
            isLoading:true,
            id:'',
            unit:1
        }
        const options = [
            { label: '01:00', value: '1' },
            { label: '01:30', value: '1.5' },
            { label: '02:00', value: '2' }
        ];
        
       
        this.setState1= this.setState1.bind(this);
    }
    setState1(text:string){
            this.setState(({city:text}))
    }

    main(){
        if(this.state.initial){
        this.retrieveLatLong();
            this.setState({
                initial:false
            })
    }
    else{
        this.searchByCity(this.state.city);
        
    }    

}
    
    searchByCity(city:string){
        this.setState({isLoading:true});
        const API = '99565354e24d63712ad95bc356956f48';
        const URL =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
        fetch(URL)
        .then(response=>response.json())
        .then(data=>{
            const {feels_like,humidity,pressure,temp,temp_max,temp_min} = data.main;
            const {speed} = data.wind;
            const {name} = data;
            const id = data.weather[0].icon;
            console.log(id);
            console.log(data); 
            this.setState({
                feels_like:feels_like,
                humidity:humidity,
                correct:true,
                temp:temp,
                temp_max,
                temp_min,
                isLoading:false,
                city:name,
                id:id
            })    

        })
        .catch(error=>{console.log(error); this.setState({correct:false,isLoading:false})});
    }
    initialSetup(latitude:number,longtitude:number){
        const API = '99565354e24d63712ad95bc356956f48';
        const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${API}`
        fetch(URL)
        .then(response=>response.json())
        .then(data=>{
            const {feels_like,humidity,pressure,temp,temp_max,temp_min} = data.main;
            const {speed} = data.wind;
            const {name} = data;
            const id = data.weather[0].icon; 
            this.setState({
                feels_like:feels_like,
                humidity:humidity,
                visibleText:name,   
                temp:temp,
                temp_max,
                temp_min,
                correct:true,
                city:name,
                isLoading:false,
                id:id
            })    
        }
            )
            .catch((error)=>{this.setState({correct:false,isLoading:false})});

    }
    getFixed(data:number){
        if(this.state.unit==1)
        {return ((data-273).toPrecision(2))+'C°';
        }
        else{
            return (((data-273)*1.8+32).toPrecision(2))+'F°'
        }
    }
    retrieveLatLong(){

        if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position=>{
            let {latitude,longitude} = position.coords;
            this.initialSetup(latitude,longitude);
         })



        }
    }
    componentDidMount(){
        this.main();
    }

    render() {
       if(this.state.isLoading){
        return(
           
            <LottieView source={require('../../animation.json')} autoPlay loop />
            
        );

       }
       
        else if(this.state.correct){
        return (
            
           <View style={{flex:1}}>
               <View style={{width:'60%',flexDirection:'row',alignItems:'center'}}>
               <Bar setState1={this.setState1}/>
               <TouchableOpacity style={{backgroundColor:'purple',marginTop:50,width:'60%',height:40,justifyContent:'center',alignItems:'center',borderRadius:20}} onPress={()=>{this.main(); this.setState({visibleText:this.state.city})}}><Text style={{color:'white'}}>Search</Text></TouchableOpacity> 
                </View>
             
            <View style={styles.mainInfo}>
            <SwitchSelector options={[
    { label: 'C', value: 1 },
    { label: 'F', value: 2 },
   
]} initial={0} style={{width:100}} onPress={(value)=>{this.setState({unit:value});} }/>
                <View style={styles.details}>
                    <Text style={styles.city}>{this.state.visibleText}</Text>
                    <View style={styles.iconNtemp}>
                   
                    <Image source={{uri:`http://openweathermap.org/img/wn/${this.state.id}@4x.png`}}
                    style={{width:200,height:200}}
                    />
                    <Text style={{fontSize:40,marginLeft:20}}>{this.getFixed(this.state.temp)}</Text>
                    </View>
                </View>
                </View>    
            <View style={styles.bottomDetails}>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <Image style={styles.icons}source={require('../../images/thermometer.png')}/>
                        <Text style={styles.infos}>Feels Like  {this.getFixed(this.state.feels_like)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icons} source={require('../../images/humidity.png')}/>
                        <Text style={styles.infos}>Humidity  {this.state.humidity}</Text>
                    </View>
                </View>
                <View style={styles.column}>
                <View style={styles.row}>
                <Image style={styles.icons} source={require('../../images/hot.png')}/>
                        <Text style={styles.infos}>Max temp  {this.getFixed(this.state.temp_max)}</Text>

                </View>
                    <View style={styles.row}>
                    <Image style={styles.icons} source={require('../../images/cold.png')}/>
                        <Text style={styles.infos}>Max temp  {this.getFixed(this.state.temp_min)}</Text>


                    </View>


                </View>
                </View>
          </View>
                )}
            return(
                <View style={{width:'100%',height:'100%'}}>
                    <View style={{width:'60%',flexDirection:'row',alignItems:'center'}}>
               <Bar setState1={this.setState1}/>
               <TouchableOpacity style={{backgroundColor:'purple',marginTop:50,width:100,height:40,justifyContent:'center',alignItems:'center',borderRadius:20}} onPress={()=>{this.main(); this.setState({visibleText:this.state.city})}}><Text style={{color:'white'}}>Search</Text></TouchableOpacity> 
                </View >
                <View style={{flex:1,alignItems:'center',justifyContent:'center',width:'100%'}}>
                <Text style={{color:'blue',fontSize:30}}>No Such City :(</Text>
                </View>
                </View>
            )

            
 
            }
  
}

export default SearchBar
