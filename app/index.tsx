import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { deleteItem } from "@/redux/action";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Index() {
  const list = useSelector((state) => state.list);
  const theme = useSelector((state) => state.colorList);
  const [noteList, setNoteList] = useState([]);
  const dispatch = useDispatch();

  const createPage = () => {
    router.push("/create");
  };

  const deleteBtn = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    setNoteList(list);
  }, [list]);

  return (
    <View style={tw` h-full`}>
      <View style={tw`h-9`}></View>
      <View
        style={tw`px-3 py-3 flex-row items-center justify-between ${
          theme === "pink"
            ? "bg-pink-600"
            : theme === "yellow"
            ? "bg-yellow-400"
            : theme === "black"
            ? "bg-black"
            : "bg-blue-600"
        }`}
      >
        <Text style={tw`font-bold text-xl text-white`}>Notes</Text>
        <TouchableOpacity onPress={() => router.push("/theme")}>
          <FontAwesome6 name="themeco" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={tw`absolute bottom-0 z-50 items-end p-6 w-full`}>
        <TouchableOpacity onPress={createPage} style={tw` `}>
          <AntDesign
            name="pluscircle"
            size={54}
            style={tw` ${
              theme === "pink"
                ? "text-pink-600"
                : theme === "yellow"
                ? "text-yellow-400"
                : theme === "black"
                ? "text-black"
                : "text-blue-600"
            }`}
          />
        </TouchableOpacity>
      </View>
      {noteList.length != 0 ? (
        <ScrollView>
          {noteList.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => router.push(`/edit/${item.id}`)}
                key={item.id}
                style={tw`bg-white m-3 p-2 rounded-lg shadow-lg`}
              >
                <View>
                  <Text style={tw`text-lg font-bold`}>{item.title}</Text>
                  <Text style={tw`text-blue-500 my-1`}>
                    {item.des.length > 10
                      ? `${item.des.slice(0, 10)}...`
                      : item.des}{" "}
                  </Text>
                  <View style={tw`flex-row justify-between items-center`}>
                    <Text>{item.date}</Text>
                    <TouchableOpacity onPress={() => deleteBtn(item.id)}>
                      <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={tw`items-center justify-center h-full`}>
          <Text
            style={tw`font-semibold text-lg bottom-15 ${
              theme === "pink"
                ? "text-pink-600"
                : theme === "yellow"
                ? "text-yellow-400"
                : theme === "black"
                ? "text-black"
                : "text-blue-600"
            }`}
          >
            There is no Note
          </Text>
        </View>
      )}
    </View>
  );
}
