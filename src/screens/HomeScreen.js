import React from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceItemList from '../components/ServerItemList';
import { firebaseStore, FIRE_BASE_AUTH } from '../context/firebaseconfig';
import Logo from 'C:/Users/MyPC/Desktop/C-WiFi-Logo.png.crdownload';
import UpdateServiceCPN from '../components/UpdateServiceCPN';

const userProfile = FIRE_BASE_AUTH;
const today = new Date();
const day = today.getDate().toString().padStart(2, '0');
const month = today.getMonth() + 1;
const year = today.getFullYear();
const hour = today.getHours().toString().padStart(2, '0');
const minute = today.getMinutes().toString().padStart(2, '0');
const second = today.getSeconds().toString().padStart(2, '0');

function HomeScreen() {
  const [searchResults, setSearchResults] = React.useState([]);
  const searchService = (query) => {
    const results = services.filter((service) => {
      return service.ServiceName.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
  };

  const [txtInputServiceName, setTxtInputServiceName] = React.useState('');
  const [txtInputServicePrice, setTxtInputServicePrice] = React.useState('');
  const ref = firebaseStore.firestore().collection('KamiSpa-db');

  const [loading, setLoading] = React.useState(true);
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { ServiceName, price, Creator, Time, FinalUpdate } = doc.data();
        list.push({
          id: doc.id,
          ServiceName,
          price,
          Creator,
          Time,
          FinalUpdate,
        });
      });

      setServices(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function addService() {
    const serviceExists = await firebaseStore
      .firestore()
      .collection('KamiSpa-db')
      .where('ServiceName', '==', txtInputServiceName)
      .get();

    if (!serviceExists.empty || !txtInputServiceName.trim()) {
      alert('Chưa nhập ServiceName hoặc ServiceName đã tồn tại!');
      return;
    }
    await ref.add({
      ServiceName: txtInputServiceName,
      price: parseInt(txtInputServicePrice),
      Creator: 'Admin',
      Time: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
      FinalUpdate: `${day}/${month}/${year} ${hour}:${minute}:${second}`,
    });

    setTxtInputServiceName('');
    setTxtInputServicePrice('')
  }

  if (loading) {
    return null;
  }

  // return (
  //   <View style={styles.container}>
  //     <Appbar style={{ width: '100%', backgroundColor: 'rgb(239, 80, 107)' }}>
  //       <Appbar.Content title={userProfile?.currentUser?.displayName} color="rgb(255, 255, 255)" />
  //     </Appbar>
  //     {/* <View>
  //       <Pressable style={styles.flexRow}>
  //         <Image source={require("C:\\Users\\ACER\\Desktop\\FinalProject\\assets\\user.png")} />
  //       </Pressable>
  //     </View> */}

  //     <View style={{ flex: 1, justifyContent: 'center', marginLeft:30, marginBottom:10 }}>
  //       <Image source={Logo} style={{ width: 300, height: 150, resizeMode: 'contain' }}/>
  //     </View>
  //     <View style={styles.groupTxtTitle}>
  //       <Text style={styles.txtTitle}>Danh sách dịch vụ</Text>
  //       <Icon.Button
  //         name="plus-circle"
  //         color="rgb(239, 80, 107)"
  //         backgroundColor="#ffffff00"
  //         size={24}
  //         onPress={addService}
  //       />
  //     </View>

  //     <FlatList
  //       style={styles.FlatList}
  //       data={searchResults.length > 0 ? searchResults : services}
  //       keyExtractor={(item) => item.id}
  //       renderItem={({ item }) => {
  //         return (
  //           <ServiceItemList item={item} />
  //         );
  //       }}
  //     />
  //     <TextInput
  //       textColor="rgb(0, 0, 0)"
  //       outlineColor="rgb(239, 80, 107)"
  //       activeOutlineColor="rgb(239, 80, 107)"
  //       mode="outlined"
  //       style={styles.textInput}
  //       label="Tìm kiếm"
  //       value={txtInputServiceName}
  //       onChangeText={(query) => {
  //         setTxtInputServiceName(query);
  //         searchService(query);
  //       }}
  //     />
  //   </View>
  // );

return (
  <View style={styles.container}>
    {/* Phần header và logo */}
    <Appbar style={{ width: '100%', backgroundColor: 'rgb(239, 80, 107)' }}>
      <Appbar.Content title={userProfile?.currentUser?.displayName} color="rgb(255, 255, 255)" />
    </Appbar>
    <View style={{ flex: 1, justifyContent: 'center', marginLeft:30, marginBottom:10 }}>
      <Image source={Logo} style={{ width: 250, height: 100, resizeMode: 'contain' }}/>
    </View>

    {/* Phần Thêm Dịch vụ */}
    <View style={styles.groupTxtTitle}>
      <Text style={styles.txtTitle}>Thêm Dịch Vụ</Text>
      <Icon.Button
        name="plus-circle"
        color="rgb(239, 80, 107)"
        backgroundColor="#ffffff00"
        size={24}
        onPress={addService}
      />
    </View>

    {/* TextInput cho Tên Dịch vụ */}
    <View style={styles.grTxtInput}>
      <View>
        <TextInput
          textColor="rgb(0, 0, 0)"
          outlineColor="rgb(239, 80, 107)"
          activeOutlineColor="rgb(239, 80, 107)"
          mode="outlined"
          style={[styles.textInput, {width:'90%'}]}
          label="Tên Dịch Vụ"
          value={txtInputServiceName}
          onChangeText={(query) => {
            setTxtInputServiceName(query);
          }}
        />
      </View>

      {/* TextInput cho Giá Dịch vụ */}
      <View>
        <TextInput
          textColor="rgb(0, 0, 0)"
          outlineColor="rgb(239, 80, 107)"
          activeOutlineColor="rgb(239, 80, 107)"
          mode="outlined"
          style={[styles.textInput, {width:'90%'}]}
          label="Giá Dịch Vụ"
          value={txtInputServicePrice}
          onChangeText={(query) => {
            setTxtInputServicePrice(query);
            // Gọi hàm hoặc thực hiện thao tác tương ứng ở đây
          }}
        />
      </View>
    </View>
    {/* Phần danh sách dịch vụ */}
    <FlatList
      style={styles.FlatList}
      data={searchResults.length > 0 ? searchResults : services}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <ServiceItemList item={item} />
        );
      }}
    />
  </View>
);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitle: {
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
    fontSize: 20,
  },
  flexRow: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEC7C0',
    flex: 1
  },
  textInput: {
    margin: 10,
    width: '95%',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  groupTxtTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
  },
  grTxtInput:{
    position: 'absolute', bottom: 0, width: '100%'
  }
});

export default HomeScreen;
