import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
mainInfo:{
width:'100%',
height:'50%',

marginTop:50,
justifyContent:'flex-end',
alignItems:'center'
},
details:{
    width:320,  
    height:300,
   
    justifyContent:'flex-start'
},
city:{
    fontSize:32,
    marginLeft:50,
    fontWeight:'bold'
   
},
iconNtemp:{
    flexDirection:'row',
    alignItems:'center'
},
bottomDetails:{
    width:'100%',
    height:150,
 
    position:'absolute',    
    bottom:0
},
column:{
    width:'100%',
    height:'50%',
   
    flexDirection:'row',
    

},
row:{
    paddingLeft:10,
    width:'50%',
    height:'100%',
   
    flexDirection:'row',
    alignItems:'center'
},
icons:{
    
    width:25,
    height:25
},
infos:{
    fontSize:14 ,
    paddingLeft:10
}

})

export default styles;
