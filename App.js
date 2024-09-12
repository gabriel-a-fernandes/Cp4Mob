import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [valor, setValor] = useState(0);
  const [cedulas, setCedulas] = useState({});

  const handleWithdraw = () => {
    if (valor % 10 !== 0) {
      alert('O valor da quantia a ser retirada deve ser múltiplo de 10');
      return;
    }

    let valorRestante = valor;

    const cedulasCinquenta = Math.floor(valorRestante / 50);
    valorRestante -= cedulasCinquenta * 50;
    setCedulas((prevCedulas) => ({ ...prevCedulas, '50': cedulasCinquenta }));

    const cedulasVinte = Math.floor(valorRestante / 20);
    valorRestante -= cedulasVinte * 20;
    setCedulas((prevCedulas) => ({ ...prevCedulas, '20': cedulasVinte }));

    const cedulasDez = Math.floor(valorRestante / 10);
    valorRestante -= cedulasDez * 10;
    setCedulas((prevCedulas) => ({ ...prevCedulas, '10': cedulasDez }));
  };

  return (
    <View style={styles.container}>
      <Text>Digite o valor a ser retirado (Múltiplo de 10)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor.toString()}
        onChangeText={(text) => setValor(parseInt(text, 10))}
      />
      <Button title="Calcular Retirada" onPress={handleWithdraw} />
      {Object.keys(cedulas).length > 0 && (
        <View>
          {Object.keys(cedulas).filter((cedulaValor) => cedulas[cedulaValor] > 0).map((cedulaValor, index) => (
            <View key={index} style={styles.billItem}>
              <Text>
                R$ {cedulaValor} ({cedulas[cedulaValor]} Cédula{cedulas[cedulaValor] > 1 ? 's' : ''})
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  billItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});