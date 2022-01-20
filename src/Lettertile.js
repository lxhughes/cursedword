import React from "react";

               
class Lettertile extends React.Component { 
    
  handleChange = (event) => {
    
      // Tab to next letter
      if (event.target.value.length >= event.target.maxLength) {
          
          const nextId = parseInt(event.target.getAttribute('data-letterpos')) + 1;
          const nextSibSelector = "#lettertile_" + nextId;
          
          const nextSibling = document.querySelector(nextSibSelector);
          
          if (nextSibling !== null) {
            nextSibling.focus();
          }
      }
      
  };
               
  render() {
      
      const name = "lettertile_"+this.props.letterpos;
      
      return <input type='text' id={name} name={name} data-letterpos={this.props.letterpos} className='lettertile form-control' maxLength='1' onChange={this.handleChange}></input>;
  }         
}

export default Lettertile;