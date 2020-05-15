export {BinaryHeap}

class BinaryHeap{
    constructor(){
        this.heap=[];
    }
    size(){
        return this.heap.length;
    }
    empty(){
        return (this.heap.length==0);
    }
    insert(value){
        this.heap.push(value);
        let idx=this.heap.length-1;
        let parent_idx=Math.floor((idx-1)/2);
        while(idx>0 && this.heap[idx][0]>this.heap[parent_idx][0]){
            let parent=this.heap[parent_idx];
            this.heap[parent_idx]=this.heap[idx];
            this.heap[idx]=parent;
            idx=parent_idx;
            parent_idx=Math.floor((idx-1)/2);
        }
    }
    heapify(idx){
        let left=2*idx+1,right=2*idx+2,maxi=idx;
        if(left<this.size() && this.heap[left][0]>this.heap[maxi][0]){
            maxi=left;
        }
        if(right<this.size() && this.heap[right][0]>this.heap[maxi][0]){
            maxi=right;
        }
        if(maxi!=idx){
            let temp=this.heap[idx];
            this.heap[idx]=this.heap[maxi];
            this.heap[maxi]=temp;
            this.heapify(maxi);
        }
    }
    extractMax(){
        let mx=this.heap[0];
        let temp=this.heap[this.size()-1];
        this.heap[this.size()-1]=mx;
        this.heap[0]=temp;
        this.heap.pop();
        if(!this.empty())
            this.heapify(0);
        return mx;
    }
}

