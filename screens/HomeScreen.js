import React, {useState, useEffect} from 'react';
import {AsyncStorage,View,Animated,Text,Dimensions ,TouchableOpacity, StyleSheet,FlatList,Modal,TextInput,Button,Alert} from 'react-native';
import { color } from 'react-native-reanimated';

const HomeScreen = ({navigation}) => {
    const [bgButtons,setBgButtons]= useState({
        current: "#04c6ff",
        history: "#eeeeee",
        save: "#eeeeee"
    });
    const [selected,setSelected] = useState("current")
    const [expense,setExpense] = useState([])
    const [visibile,setVisibile] = useState(false)
    const [name,setName] = useState("")
    const [amount,setAmount] = useState("")
    const [date, setDate] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [history, setHistory] = useState([])
    const clearAll = async()=>{
        storeExpense([])
        storeHistory([])
        console.log("clearedAll")
    }
    const storeExpense = async (data) => {
        try {
            await AsyncStorage.setItem(
            'expenses',
            JSON.stringify(data)
            );
        } catch (error) {
            console.log(error)
        }
        };
    const getExpense = async () => {
        try {
            const value = await AsyncStorage.getItem('expenses');
            if (value !== null) {
                setExpense(JSON.parse(value));
            }
        } catch (error) {
            console.log(error)
        }
        };
    const storeHistory = async (data) => {
        try {
            await AsyncStorage.setItem(
            'history',
            JSON.stringify(data)
            );
        } catch (error) {
            console.log(error)
        }
        };
    const getHistory = async () => {
        try {
            const value = await AsyncStorage.getItem('history');
            if (value !== null) {
                setHistory(JSON.parse(value));
            }
        } catch (error) {
            console.log(error)
        }
        };
    useEffect(
        ()=>{
            getExpense()
            console.log("loaded")
        },[]
    )

    const styles = StyleSheet.create({
    bg:{
        backgroundColor:"#eeeeee",
        borderColor:"rgb(255,255,255)",
        borderWidth:1,
        borderRadius:5,
        width: Dimensions.get('window').width-50,
        height: Dimensions.get('window').height-100,
        shadowColor: "#959595",
            shadowOffset: {
            width: 0,
            height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
    },
    title:{
        fontSize:20,
        textAlign:'center',
        color:"black",
        marginVertical:10,
    },
    button:{
        fontSize:20,
        textAlign:'center',
        color:"black",
        
    },
    txtButtonCurrent:{
        paddingHorizontal:31,
        paddingVertical:10,
        borderWidth:0.5,
        borderColor:'white',
        backgroundColor: bgButtons.current,
    },    
    txtButtonHistory:{
        paddingHorizontal:31,
        paddingVertical:10,
        borderWidth:0.5,
        borderColor:'white',
        backgroundColor: bgButtons.history,
    },    
    txtButtonSave:{
        paddingHorizontal:31,
        paddingVertical:10,
        borderWidth:0.5,
        borderColor:'white',
        backgroundColor: bgButtons.save,
    },    
    cover:{
        borderWidth:1,
        borderColor:'#C0C0C0',
        backgroundColor:'#04c6ff'
    },
    coverButtons:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#C0C0C0',
        justifyContent: 'space-around'
    },
container:{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        item:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            borderWidth:1,
            borderColor:'#04c6ff',
            width: Dimensions.get('window').width*0.86,
            paddingVertical:10,
        },
        add:{
            fontSize:16,
            paddingVertical:10,
            color:'white'
        },
        addButton:{
            width:"100%",
            alignItems:'center',
            backgroundColor:"#04c6ff",
            borderWidth:1,
            borderColor:'white'
        },
        expnese:{
            fontSize:16,
            paddingHorizontal:10
        },
        price:{
            fontSize:16,
            paddingHorizontal:10
        },
        delete:{
            fontSize:16,
            paddingHorizontal:10,
            color:'red',
            fontWeight:'bold',

        },
        modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    input: {
        paddingVertical:5,
        paddingHorizontal:30,
        marginBottom:10,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:'black'
    },
});
if(selected=="current"){
    return(
        <View style={{backgroundColor:"#04c6ff", flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',}}>
        <View style={styles.bg}>
        <View style={styles.cover}>
        <Text style={styles.title}>CURRENT EXPENSES</Text>
        </View>
        <View style={styles.coverButtons}>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                    setBgButtons({
                        current: "#04c6ff",
                        history: "#eeeeee",
                        save: "#eeeeee"
                    })
                    setSelected("current")
                }}
            >
                <Text style={styles.txtButtonCurrent}>CURRENT</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{
                setBgButtons({
                        current: "#eeeeee",
                        history: "#04c6ff",
                        save: "#eeeeee"
                })
                setSelected("history")
            }}
            >
                <Text style={styles.txtButtonHistory}>HISTORY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                setBgButtons({
                        current: "#eeeeee",
                        history: "#eeeeee",
                        save: "#04c6ff"
                })
                setSelected("save")
            }}
            >
                <Text style={styles.txtButtonSave}>SAVE</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Modal
            transparent={true}
            visible={visibile}
            animationType='fade'
            >
                <View style = {styles.modalBackground}>
                    <View style={{backgroundColor:'white',flexDirection:"column",justifyContent:"center",width:250,height:250,paddingHorizontal:30}}>
                        <TextInput
                            placeholder="EXPENSE NAME"
                            autoCapitalize="characters"
                            style={styles.input}
                            onChangeText={(txt)=>{setName(txt)}}
                        />
                        <TextInput
                            placeholder="EXPENSE AMOUNT"
                            autoCapitalize="characters"
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={(txt)=>{setAmount(txt)}}
                        />
                        <Button
                            title="ADD"
                            onPress={()=>{
                                if(name!="" && amount!=""){
                                    storeExpense([...expense,{name:name,price:amount}]);
                                    setExpense([...expense,{name:name,price:amount}])
                                    setName("")
                                    setAmount("")
                                    setVisibile(false)
                                
                                }else{
                                    Alert.alert("NAME AND AMOUNT REQUIRED")
                                }
                            }}                            
                        />
                        <View style={{paddingVertical:5}}></View>
                        <Button
                            title="Close"
                            onPress={()=>{
                                setVisibile(false)
                                setName("")
                                setAmount("")
                                }}
                        />
                    </View>
                </View>
            </Modal>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={()=>{setVisibile(true)}}
                >
            <Text style={styles.add}>ADD NEW EXPENSE</Text>
            </TouchableOpacity>
            <FlatList
                keyExtractor={item=>Math.random().toString(36).substring(7)}
                data={expense}
                renderItem={({item,index})=>{
                    return( 
                        <View style={styles.item}>   
                            <Text style={styles.expnese}>{index+1})  {item.name}</Text>
                            <Text style={styles.price}>Rs. {item.price}</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    if (index > -1) {
                                        var array = expense
                                        array.splice(index, 1);
                                        storeExpense(array)
                                        getExpense()
                                        setSelected("current")
                                        console.log(array)
                                    }
                                }}
                            >
                                <Text style={styles.delete}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
        </View>
        </View>
);
}else if(selected=="history"){
    return(
        <View style={{backgroundColor:"#04c6ff", flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',}}>
        <View style={styles.bg}>
        <View style={styles.cover}>
        <Text style={styles.title}>CURRENT EXPENSES</Text>
        </View>
        <View style={styles.coverButtons}>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                    setBgButtons({
                        current: "#04c6ff",
                        history: "#eeeeee",
                        save: "#eeeeee"
                    })
                    setSelected("current")
                }}
            >
                <Text style={styles.txtButtonCurrent}>CURRENT</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{
                setBgButtons({
                        current: "#eeeeee",
                        history: "#04c6ff",
                        save: "#eeeeee"
                })
                setSelected("history")
            }}
            >
                <Text style={styles.txtButtonHistory}>HISTORY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                setBgButtons({
                        current: "#eeeeee",
                        history: "#eeeeee",
                        save: "#04c6ff"
                })
                setSelected("save")
            }}
            >
                <Text style={styles.txtButtonSave}>SAVE</Text>
            </TouchableOpacity>
        </View>
        <FlatList
                keyExtractor={item=>Math.random().toString(36).substring(7)}
                data={history}
                renderItem={({item,index})=>{
                    return( 
                        <View style={styles.item}>   
                            <Text style={styles.expnese}>{item.date}</Text>
                            <Text style={styles.price}>Rs. {item.price}</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    if (index > -1) {
                                        var array = history
                                        array.splice(index, 1);
                                        storeHistory(array)
                                        getHistory()
                                        setSelected("history")
                                        console.log(array)
                                    }
                                }}
                            >
                                <Text style={styles.delete}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
        </View>
);
}else if(selected=='save'){
    return(
        <View style={{backgroundColor:"#04c6ff", flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',}}>
        <View style={styles.bg}>
        <View style={styles.cover}>
        <Text style={styles.title}>CURRENT EXPENSES</Text>
        </View>
        <View style={styles.coverButtons}>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                    setBgButtons({
                        current: "#04c6ff",
                        history: "#eeeeee",
                        save: "#eeeeee"
                    })
                    setSelected("current")
                }}
            >
                <Text style={styles.txtButtonCurrent}>CURRENT</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={()=>{
                setBgButtons({
                        current: "#eeeeee",
                        history: "#04c6ff",
                        save: "#eeeeee"
                })
                setSelected("history")
            }}
            >
                <Text style={styles.txtButtonHistory}>HISTORY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>{
                setBgButtons({
                        current: "#eeeeee",
                        history: "#eeeeee",
                        save: "#04c6ff"
                })
                setSelected("save")
            }}
            >
                <Text style={styles.txtButtonSave}>SAVE</Text>
            </TouchableOpacity>
        </View>
        <View style={{marginLeft:Dimensions.get('window').width*0.14,
                marginTop:Dimensions.get('window').height*0.14,
                width:Dimensions.get('window').width*0.66,}}>
            <TextInput
                placeholder="DATE"
                autoCapitalize='characters'
                onChangeText={(txt)=>{setDate(txt)}}
                keyboardType='numeric'
                style={styles.input}
            />
            <TextInput
                placeholder="MONTH"
                autoCapitalize='characters'
                onChangeText={(txt)=>{setMonth(txt)}}
                style={styles.input}
            />
            <TextInput
                placeholder="YEAR"
                autoCapitalize='characters'
                onChangeText={(txt)=>{setYear(txt)}}
                keyboardType='numeric'
                style={styles.input}
            />
            <Button
                title="Save"
                onPress={()=>{
                    if(date!="" && month!="" && year !=""){
                    var sum = 0
                    expense.forEach((item)=>{
                        sum = sum + Number(item.price)
                        console.log(sum)
                    })
                    storeHistory([...history,{date:date+"-"+month+"-"+year,price:sum}])
                    setHistory([...history,{date:date+"-"+month+"-"+year,price:sum}])
                    setDate("")
                    setMonth("")
                    setYear("")
                    storeExpense([])
                    setExpense([])
                    Alert.alert("Record Added in History")
                    setSelected("history")
                    }else{
                        Alert.alert("Date, Month and Year are Required")
                    }
                }}
                style={{marginTop:15}}
            />
            
        </View>
        </View>
        </View>
);
}

}


export default HomeScreen;
;