import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image} from 'react-native';

//Exercise 1C - create originalData
let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);



    //Add useEffect = Exercise 1B
    useEffect(() => {
        //Add fetch() = Exercise 1A
        const myurl = "https://onlinecardappwebservice-30jy.onrender.com/allcards"
        fetch (myurl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson);
                originalData = myJson;
            })
    },[]);

    //Added filterData - Exercise 1C
    const FilterData = (text) => {
        if(text!=''){
            let myFilteredData = originalData.filter((item) =>
                item.card_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }


    const renderItem = ({item, index}) => {
        return (
            <View>
                <Text style={{borderWidth:1}}>{item.card_name}</Text>
                <Image source ={{uri: item.card_pic}}
                       style={{ width: 100, height: 100 }} />
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text>Search:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>{FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
//yay