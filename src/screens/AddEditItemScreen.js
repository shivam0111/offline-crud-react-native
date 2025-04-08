import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { insertItem, updateItemInDB } from '../db/dbService';
import { addItem, updateItem } from '../redux/actions';
import { itemValidationSchema } from '../utils/validation';

const AddEditItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editingItem = route.params?.item;

  const isEdit = !!editingItem;

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        const updated = { ...editingItem, ...values };
        await updateItemInDB(updated);
        dispatch(updateItem(updated));
      } else {
        const newItem = await insertItem(values);
        dispatch(addItem(newItem));
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong while saving the item.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{isEdit ? 'Update Item' : 'Add New Item'}</Text>
      <Formik
        initialValues={{
          name: editingItem?.name || '',
          description: editingItem?.description || '',
        }}
        validationSchema={itemValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formCard}>
            <View style={styles.field}>
              <Text style={styles.label}>📝 Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholderTextColor={'#888'}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>
            <Text style={styles.label}>📄 Description</Text>
            <View style={styles.field}>
              <TextInput
                style={[styles.input, { height: 100 }]}
                multiline
                placeholder="Enter description"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholderTextColor={'#888'}
              />
              {touched.description && errors.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>{isEdit ? 'Update' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddEditItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    paddingHorizontal: 20,
    paddingTop: 15
  },
  heading: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
    fontSize: 15,
    color: '#333',
  },
  error: {
    color: '#d9534f',
    fontSize: 13,
    marginVertical: 5,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  field:{
    marginBottom: 10
  }
});
