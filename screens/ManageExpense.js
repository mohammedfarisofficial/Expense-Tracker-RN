import { View,StyleSheet} from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../contants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    navigation.goBack()
    expenseCtx.deleteExpense(editedExpenseId);
  };
  const cancelHandler = () => {
    navigation.goBack()
  }
  const confirmHandler = () => {
    if(isEditing){
      expenseCtx.updateExpense(editedExpenseId,{
        description: 'Test !!!',
        amount: 2.33,
        date : new Date(13-4-2003),
      })
    }else{
      expenseCtx.addExpense({
        description: "testing",
        amount: 23.55,
        date: new Date('2022-05-19')
      })
    }
    navigation.goBack()

  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler} >Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer} >
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={30}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }, 
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})