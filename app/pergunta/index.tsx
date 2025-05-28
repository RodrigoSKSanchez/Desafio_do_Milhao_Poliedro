import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PerguntaScreen() {
  const [pergunta, setPergunta] = useState("");
  const router = useRouter();
  const [dificuldade, setDificuldade] = useState<1 | 2 | 3>(1);

const handleEnviar=()=>{
    if (!pergunta.trim()){
        Alert.alert("Erro", "Pergunta não pode ser vazia")
        return
    }
        Alert.alert("Sucesso", "Pergunta enviada")
        setPergunta("")
        setDificuldade(1)
}

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite a pergunta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemplo: qual a capital do Brasil?"
        value={pergunta}
        onChangeText={setPergunta}
        multiline
      />
      <Text style={styles.label}>Dificuldade</Text>
      <View style={styles.dificuldadeContainer}>
        {[1, 2, 3].map((nivel) => (
          <TouchableOpacity
            key={nivel}
            onPress={() => setDificuldade(nivel as 1 | 2 | 3)}
            style={[styles.dificuldadeButton, dificuldade===nivel&&styles.dificuldadeselecionada]}
            
          >
            <Text style={{
                color: dificuldade===nivel ? "#fff":"#000",
                fontWeight:"bold"
            }}>{nivel}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.enviarbtn}
        onPress={handleEnviar}
      >
        <Text style={styles.enviartext} >Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.voltarbtn}
        onPress={()=>router.push("/jogo_menu")}
      >
        <Text style={styles.voltartext} >Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles= StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
  },
    label:{
        fontSize:18,
        fontWeight:"600",
        marginTop:20,
        marginBottom:10,
    },
    input:{
        borderWidth:1,
        borderColor:"#B2B2B2",
        borderRadius:10,
        padding:10,
        fontSize:16,
        minHeight:80,
        textAlignVertical:"top",
        
    },
    dificuldadeContainer:{
        flexDirection:"row",
        gap:10,
        marginVertical:10,
    },
    dificuldadeButton:{
        borderWidth:1,
        borderColor:"#aaa",
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:"#eee",
    },
    dificuldadeselecionada:{
        backgroundColor:"#26264f",
        borderColor:"#26264f",
        color:"#aaa"
    },
    enviarbtn:{
        marginTop:30,
        backgroundColor:"#499A7C",
        paddingVertical:15,
        borderRadius:10,
        alignItems:"center",

    },
    enviartext:{
        color:"#fff",
        fontSize:16,
        fontWeight:"bold",
    },
    voltarbtn:{
        marginTop:30,
        backgroundColor:"#B2B2B2",
        paddingVertical:15,
        borderRadius:10,
        alignItems:"center",
    },
    voltartext:{
        color:"#ff",
        fontSize:16,
        fontWeight:"bold",
    }
})
