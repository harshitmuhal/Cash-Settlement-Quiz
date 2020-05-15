
import { BinaryHeap } from './heap.js';

onload = function () {
    // create a network
    let curr_data;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    const genNew = document.getElementById('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');
    // initialise graph options
    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            },
            hover:true
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'circle',
            hover:true,
        }
    };
    // initialize your network!
    let network = new vis.Network(container);
    network.setOptions(options);
    let network2 = new vis.Network(container2);
    network2.setOptions(options);

    function createData(){
        const sz=Math.floor(Math.random()*8)+3;

        console.log(sz);
        
        let nodes=[];
        for(let i=1;i<=sz;i++){
            nodes.push({id:i,label:"Person"+i});
        }
        
        //nodes = new vis.DataSet(nodes);

        let edges=[];
        for(let i=1;i<=sz;i++){
            for(let j=i+1;j<=sz;j++){
                console.log(i,j);
                //this will control the no of edges because even if we assume a uniform probability distrubution probabilty
                //is less than 1/2 for half time and greater for remaining half. so nc2 is the total edges and now randomly
                //nc2/2 edges will be selected
                if(Math.random()<0.5){
                    //it controls the direction of edges
                    if(Math.random()<0.5){
                        edges.push({from:i,to:j,label: String(Math.ceil(Math.random()*100+1))});
                    }
                    else{
                        edges.push({from:j,to:i,label: String(Math.ceil(Math.random()*100+1))});
                    }
                }
            }
        }
        const data={
            nodes:nodes,
            edges:edges
        };

        console.log(data['nodes']);
        console.log(data['edges']);
        return data;
    }

    function solveData(){
        let data=curr_data;
        let val=[];
        let sz=data['nodes'].length;
        for(let i=0;i<sz;i++){
            val.push(0);
        }
        for(let i=0;i<data['edges'].length;i++){
            let edge=data['edges'][i];
            val[edge['from']-1]-=parseInt(edge['label']);
            val[edge['to']-1]+=parseInt(edge['label']);
        }

        let posheap=new BinaryHeap();
        let negheap=new BinaryHeap();

        for(let i=0;i<sz;i++){
            if(val[i]>0){
                posheap.insert([val[i],i]);
            }
            else if(val[i]<0){
                negheap.insert([-val[i],i]);
            }
        }

        let new_edge=[];

        while(!posheap.empty() && !negheap.empty()){
            let mx=posheap.extractMax();
            let mn=negheap.extractMax();

            let amount=Math.min(mx[0],mn[0]);

            new_edge.push({from:mn[1]+1,to:mx[1]+1,label:String(amount)});

            if(mx[0]-amount>0){
                posheap.insert([mx[0]-amount,mx[1]]);
            }
            if(mn[0]-amount>0){
                negheap.insert([mn[0]-amount,mn[1]]);
            }
        }

        data = {
            nodes: data['nodes'],
            edges: new_edge
        };
        return data;
    }
    genNew.onclick = function () {
        const data = createData();
        curr_data = data;
        network.setData(data);             //The display property also allows the author to show or hide an element.
        temptext.style.display = "inline"; //  An inline element has floating content on its left and right side. 
        //A block element fills the entire line, and nothing can be displayed on its left or right side.
        container2.style.display = "none"; // none in container2 will not show data
    };

    solve.onclick = function () {
        temptext.style.display  = "none";
        container2.style.display = "inline";
        const solvedData = solveData();
        network2.setData(solvedData);
    };
    
    genNew.click();

};