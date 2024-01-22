import { createStore,combineReducers } from "redux";
let puraniTransactions={
    history:[],
    // credited:[],
    // debited:[],
}
let Transactions=(oldTransaction=puraniTransactions,newTransactions)=>{
    oldTransaction={
        ...oldTransaction
    }
    switch(newTransactions.type){
        case "ADD_EXPENSE":
            if(newTransactions.payload.amount>0){
                newTransactions.payload.T_type="credited";
                oldTransaction.history.push(newTransactions.payload);   
            }
            else if(newTransactions.payload.amount<0){
                newTransactions.payload.T_type="debited";
                oldTransaction.history.push(newTransactions.payload);
            }
        break;
        case "DELETE_TRANSACTION":
            oldTransaction.history.splice(newTransactions.payload,1);
            
        break;
        default: 
        
    }
    return oldTransaction;
}
let allsection=combineReducers({Transactions})
let mystore=createStore(allsection);
export default mystore;