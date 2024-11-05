import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/theme/theme';
import { AntDesign } from '@expo/vector-icons';
const DropDownButton = ({ title, items, setCurrentOption }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>{title} </Text>
        <AntDesign name="down" size={16} color={COLORS.naranja} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                    setCurrentOption(item);
                    setModalVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,
    width:"100%",
    justifyContent:'center',
    alignItems:'center'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flexDirection:'row',
    alignItems:'center'
  },
  buttonText: {
    color: COLORS.negro,
    fontSize: 24,
    fontWeight:'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default DropDownButton;
