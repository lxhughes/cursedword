export function Lettertile(letterpos) { 
    
  const handleChange = (event) => {
    
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
      
  const name = "lettertile_"+letterpos;
      
  return (
      <input type='text' id={name} name={name} data-letterpos={letterpos} className='lettertile form-control' maxLength='1' onChange={handleChange}></input>
  );

}