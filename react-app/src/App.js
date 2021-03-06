import likeIcon from './icons/like.svg';
import superlikeIcon from './icons/superlike.svg';
import skipIcon from './icons/skip.svg';

import popLike from './icons/popLike.svg';
import popSkip from './icons/popSkip.svg';
import popSuperlike from './icons/popSuperlike.svg';

import data from './data/people.json';
import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyId: data.length-1,
      isExpanded: false
    };
    this.like = this.like.bind(this);
    this.skip = this.skip.bind(this);
    this.superlike = this.superlike.bind(this);
    this.addCards = this.addCards.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.expand = this.expand.bind(this);
  }

  handleSwipe = (card) => {

    var ctx = this;

    const container = card.getElementsByClassName("swipe-container").item(0);

    const cardTitle = card.getElementsByClassName("card-title").item(0);

    const likeBtn = document.getElementsByClassName("like").item(0);
    const skipBtn = document.getElementsByClassName("skip").item(0);
    const superlikeBtn = document.getElementsByClassName("superlike").item(0);

    container.addEventListener("touchstart", startTouch, { passive: true});
    container.addEventListener("touchmove", moveTouch, { passive: true});

    container.addEventListener("mousedown", startMouse, { passive: true});
    container.addEventListener("mousemove", moveMouse, { passive: true});

    // Swipe Up / Down / Left / Right
    var initialX = null;
    var initialY = null;
    var minitialX = null;
    var minitialY = null;

    function startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    };
    function startMouse(e) {
      minitialX = e.clientX;
      minitialY = e.clientY;
    };

    function moveTouch(e) {
      if (initialX === null) {
        return;
      }

      if (initialY === null) {
        return;
      }

      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;

      var diffX = initialX - currentX;
      var diffY = initialY - currentY;

      /*
       * TODO (ジャヤント) - modify implementation for better result
       * スワイプエリアを編集する
       */
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 2 && !(ctx.state.isExpanded)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          skipBtn.click();
        } else {
          // swiped right
          likeBtn.click();
        }  
      } else if (Math.abs(diffX) < Math.abs(diffY) && Math.abs(diffY) > 2 && !(ctx.state.isExpanded)) {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          superlikeBtn.click();
        } else {
          // swiped down
        }  
      }
      if (Math.abs(diffX) < Math.abs(diffY) && Math.abs(diffY) > 2 && (ctx.state.isExpanded) && diffY<0)
        cardTitle.click();

      initialX = null;
      initialY = null;

      // e.preventDefault();
    }
    function moveMouse(e) {
      if (minitialX === null) {
        return;
      }

      if (minitialY === null) {
        return;
      }

      var currentX = e.clientX;
      var currentY = e.clientY;

      var diffX = minitialX - currentX;
      var diffY = minitialY - currentY;

      /*
       * TODO (ジャヤント) - modify implementation for better result
       * スワイプエリアを編集する
       */
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 2 && !(ctx.state.isExpanded)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
          skipBtn.click();
        } else {
          // swiped right
          likeBtn.click();
        }  
      } else if (Math.abs(diffX) < Math.abs(diffY) && Math.abs(diffY) > 2 && !(ctx.state.isExpanded)) {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
          superlikeBtn.click();
        } else {
          // swiped down
        }  
      }
      if (Math.abs(diffX) < Math.abs(diffY) && Math.abs(diffY) > 2 && (ctx.state.isExpanded) && diffY<0)
        cardTitle.click();

      minitialX = null;
      minitialY = null;
      
      // e.preventDefault();
    }

  }

  addCards() {
    const newData = data.map((data, i) => {
      return (
        <div className="card" key={i}>
          <img src={popLike} className="popLike" alt="" onContextMenu={(e)=> e.preventDefault()} />
          <img src={popSkip} className="popSkip" alt="" onContextMenu={(e)=> e.preventDefault()} />
          <img src={popSuperlike} className="popSuperlike" alt="" onContextMenu={(e)=> e.preventDefault()} />
          <img className="card-image disableSave" src={process.env.PUBLIC_URL + "/assets/pokemon/" + data.img} alt="user" onContextMenu={(e)=> e.preventDefault()} />
          <div className="card-title"><p onClick={this.expand}><b>{data.name}</b>, {data.age}</p></div>
          <div className="card-description"><p>{data.about}</p></div>
          <div className="swipe-container"></div>
        </div>
      )
    });
    return newData;
  }

  like = () => {
    if (this.state.keyId >= 0) {
      var element = document.getElementsByClassName("card").item(this.state.keyId);
      element.getElementsByClassName("popLike").item(0).style.display = 'block';
      element.classList.add("animateLike");
      setTimeout(function(){ element.remove(); }, 600);
      var temp = this.state.keyId - 1;
      this.setState({keyId: temp});
    }
  }
  
  skip = () => {
    if (this.state.keyId >= 0) {
      var element = document.getElementsByClassName("card").item(this.state.keyId);
      element.getElementsByClassName("popSkip").item(0).style.display = 'block';
      element.classList.add("animateSkip");
      setTimeout(function(){ element.remove(); }, 600);
      var temp = this.state.keyId - 1;
      this.setState({keyId: temp});
    }
  }
  
  superlike = () => {
    if (this.state.keyId >= 0) {
      var element = document.getElementsByClassName("card").item(this.state.keyId);
      element.getElementsByClassName("popSuperlike").item(0).style.display = 'block';
      element.classList.add("animateSuperlike");
      setTimeout(function(){ element.remove(); }, 600);
      var temp = this.state.keyId - 1;
      this.setState({keyId: temp});
    }
  }

  expand = () => {
    var element = document.getElementsByClassName("card").item(this.state.keyId);
    element.parentNode.classList.toggle("stack-expanded");
    element.classList.toggle("animateExpansion");
    element.getElementsByClassName("card-image").item(0).classList.toggle("card-image-expanded");
    element.getElementsByClassName("card-description").item(0).classList.toggle("card-desc-expanded");
    var temp = !this.state.isExpanded;
    this.setState({isExpanded: temp});
  }

  componentDidMount() {
    const cardList = document.getElementsByClassName("card");
    const size = document.getElementsByClassName("card").length;

    for (var i=0; i<size; i++) {
      this.handleSwipe(cardList.item(i));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Card UI</h1>
        <div className="card-stack">
          <div className="empty-card">
            <img className="disableSave" src={process.env.PUBLIC_URL + "/assets/empty.png"} alt="empty" onContextMenu={(e)=> e.preventDefault()} />
          </div>
          {this.addCards()}
        </div>
  
        <div className="controls">
          <div className="skip noSelect" onClick={this.skip}>
            <img className="disableSave" src={skipIcon} alt="skipIcon" onContextMenu={(e)=> e.preventDefault()} />
          </div>
          <div className="superlike noSelect" onClick={this.superlike}>
            <img className="disableSave" src={superlikeIcon} alt="superlikeIcon" onContextMenu={(e)=> e.preventDefault()} />
          </div>
          <div className="like noSelect" onClick={this.like}>
            <img className="disableSave" src={likeIcon} alt="likeIcon" onContextMenu={(e)=> e.preventDefault()} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
