function PostButton(props) {
    var style = {
        width:24,
        height:24
    };
    
    return (
        <button style = {style} onClick = { () => props.handleClick()}>{ props.label }</button>
    );
}

function PostText(props) {
    var style = {
        border:"1px solid black",
        width: props.width
    };
    
    return(
        <div style = {style}>{props.text}</div>
    );
    
}

function Post(props) {
    var style = {
        display: 'flex'
    };
    
    return (
        <div style = {style}>
          <PostButton label = "x" handleClick = {props.removePost}/>
          <PostText text = {props.title} width = "200"/>
          <PostButton label = "+" handleClick = {props.incrementScore}/>
          <PostText text = {props.score} width = "20"/>
          <PostButton label = "-" handleClick = {props.decrementScore}/>
        </div>
    );
    
}

function PostList(props) {
    return (
        <ol>
          {props.postList.map((post, i) => 
            <Post key = {i} title = {post.title} score = {post.score} incrementScore = {() => props.updateScore(i, 1)}                         
            decrementScore = {() => props.updateScore(i, -1)} removePost = {() => props.removePost(i)}/>
          )}
        </ol>
    );
}

// Controlled Component
class App extends React.Component {
    constructor(props) {
        super(props);
        
        //two state attributes: one to hold the value of the input element 
        //and one to hold the array of post data.
        
        this.state = { value: "", posts: [] }
        
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
        //console.log(this.state.value);
    }
    
    // The method first makes a copy of the current items state array by using the slice() array. 
    // Then it takes in the value state attribute and truncates it to 20 characters using the substring() 
    // method. Then it creates an object containing the truncated string as a title and the value 0 as 
    // its score and adds it to the copied items array. Then it sorts the copied items array in descending 
    // order of score. Lastly, it updates the state to equal the sorted copied items array and sets the
    // value state attribute back to an empty string.
    addPost() {
        var copy = this.state.posts.slice();
        var truncate = this.state.value.substring(0,20);
        
        copy.push({ title: truncate, score: 0 });
        copy.sort((a, b) => {
            return b.score - a.score;
        });
        
        this.setState({ posts: copy, value: "" });
    }
    
    // make a copy of the the items state attribute by using the slice() method.
    // then reference a specific index of the copied items array and update that items score based on the val 
    // argument. The copied items array is then sorted and the state is set to equal the sorted copied array.
    updateScore(index, val) {
        var copy = this.state.posts.slice();
        
        copy[index].score += val;
        copy.sort((a,b) => {
            return b.score - a.score;
        });
        
        this.setState({ posts: copy });
    }
    
    removePost(index) {
        var copy = this.state.posts.slice();
        copy.splice(index, 1);
        
        copy.sort((a,b) => {
            return b.score - a.score;
        });

        this.setState({ posts: copy });
    }
    
    render() {
        return (
            <div>
              <input type="text" value = { this.state.value } onChange = { this.handleChange.bind(this) }/>
              <button onClick = { () => this.addPost()}>Submit</button>
              <PostList postList = {this.state.posts} updateScore = {this.updateScore.bind(this)} removePost = {this.removePost.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));