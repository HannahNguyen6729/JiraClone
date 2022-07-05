import React from 'react'
import {useState, useRef} from 'react'


export default function Contact() {
  let list= [{id:1 , name: 'task1'}, {id:2 , name: 'task2'}, {id:3 , name: 'task3'}, {id:4 ,name:'task4'}]
  let [arr, setArr] = useState(list)
  let taskDrag = useRef({});
  let handleDragStart = (e,task, index) => {
    // console.log('target', e.target)
    // console.log('task', task)
    // console.log('index', index)
    taskDrag.current = task
  }
  const handleDragOver=e=> {
     //console.log(e.target)
  }
  const handleDragEnd=e=>{
     //console.log(e.target)
  }
  const handleDrop= e=> {
    //console.log(e.target)
  }
  const handleDragEnter = (e,task,index)=> {
    // console.log('target', e.target)
    // console.log('task', task)
    // console.log('index', index)
    let newArr = [...arr];
    let i = newArr.findIndex(item=> item.id === taskDrag.current.id);
    let indexDragEnter = newArr.findIndex(item=> item.id === task.id)
    let temp= newArr[i];
     newArr[i] = newArr[indexDragEnter]
     newArr[indexDragEnter] = temp;
     setArr(newArr);
  }
  console.log(arr)
  return (
    <div className= 'container'>
      <div className="row">
        <div className="col-4"style={{height:'400px'}}>hi e</div>
        <div className="col-4 p-5 bg-warning">
          <h1 draggable='true'>task list</h1>
          {arr.map((item, index)=> (
            <div  key={index} 
                  className="bg-info m-5"
                  draggable='true'
                  onDragStart= {e=> handleDragStart(e,item,index)}
                  // onDragOver={handleDragOver}
                  // onDragEnd= {handleDragEnd}
                  onDragEnter={e=>handleDragEnter(e,item,index)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div 
               draggable='true'
              onDrop= {handleDrop}
              onDragOver= {e=> e.preventDefault()}
              className="col-4 bg-success" 
              style={{height:'400px'}}
          >hihihi</div>
      </div>
    </div>
  )
}
