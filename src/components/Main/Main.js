import React from 'react'
import { useForm } from 'react-hook-form';
import "./Main.css"
import { useDispatch, useSelector } from 'react-redux';

let Main = () => {
    let history=useSelector((store)=>{
        return store.Transactions;
    }).history;

    let total=0;
    let income=0;
    let expense=0;
    history.forEach((h)=>{
        if(h.T_type==="credited"){
            income=income+Number(h.amount); 
        }
        else if(h.T_type==="debited"){
            expense=expense+Number(h.amount);
        }
        total=income+expense;
    })
    let {register,handleSubmit,reset,formState:{errors}}=useForm();
    let dispatch=useDispatch();
    let savedata=(Transationdata)=>{
        dispatch({
            type:"ADD_EXPENSE",
            payload:Transationdata,
        })
        reset();
    }
    return (
        <section className='section pt-12'>
            <div className='w-1/4 m-auto '>
                <h1 className='font-light text-2xl p-2 text-center'>Expense Tracker</h1>
                <div className='text-center '>
                    <h2 className='text-lg text-center'>Your Balance</h2>
                    <span className='font-bold text-4xl'>${total? total: "0"}</span>
                </div>
                <div className='bg-white p-6 shadow flex flex-wrap w-full justify-center content-center'>
                    <div className='uppercase w-1/2 text-center  border-r text-green-700'>
                        <div className='w-full font-bold '>Income</div>
                        <div className='w-full'>${income}</div >
                    </div>
                    <div className='uppercase w-1/2 text-center text-red-600'>
                        <div className='w-full font-bold '>Expense</div>
                        <div className='w-full'>${expense*-1}</div >
                    </div>
                </div>
                <h2 className='text-center text-lg font-bold mt-7 mb-3 border-b border-gray-400 pb-3'>Transaction History</h2>
                    {
                        history.map((Transaction,indx)=>{
                            return (
                                <div key={indx} className={`${Transaction.T_type==="credited"?"border-green-800" :"border-red-700"} 'w-full relative _parent flex justify-between p-3 mt-3 mb-3 bg-white shadow-emerald-300 border-r-4 '`}>
                                    <button className='h-6 w-6 text-2xl font-bold absolute -left-7 bg-red-600 opacity-0 hover:opacity-100 transition-opacity text-white p-0.5 text-xs  _del'
                                    onClick={()=>{
                                        dispatch({
                                            type:"DELETE_TRANSACTION",
                                            payload:indx,
                                        });
                                    }}
                                    >--</button>
                                    <div>{Transaction.name}</div>
                                    <div>{Transaction.amount<0? "- $"+Transaction.amount*-1: "$"+Transaction.amount}</div>
                                </div>  
                            )      
                        })
                    }
                <h2 className='text-center text-lg font-bold mt-7 mb-1 border-b border-gray-400 pb-3'>Add New Transaction</h2>
                <div>
                    <form action="" onSubmit={handleSubmit(savedata)}>
                        <label className='mt-3 mb-3'>Description</label>
                        <input  {...register("name",{
                            required:{
                                value:true,
                                message:"Please Enter Expense Descriptions"
                            }
                        })}
                        type="text" className='w-full h-10 text-lg mt-3 mb-3 p-2' />
                        <p className='text-red-600 mb-5'>
                            {errors.name ? errors.name.message  :""}    
                        </p>  
                        <label>Transaction Amount, (Negative Expenses and Positive Amount)</label>
                        <input  {...register("amount",{
                            required:{
                                value:true,
                                message:"Expense or Income Cann't be Zero '0'"
                            }
                        })}
                        type="number" className='w-full h-10 text-lg  mt-3 mb-3 p-2' />
                        <button className='w-full bg-indigo-800 mt-1 mb-3 p-3 text-xl font-bold text-white'>Add Transation</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Main;