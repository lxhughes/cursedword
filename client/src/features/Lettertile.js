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

  let autoFocus = false;
    if(letterpos == 0) autoFocus = true;
      
  return (
      <input type='text' id={name} name={name} autoFocus={autoFocus} data-letterpos={letterpos} className='lettertile unk form-control' maxLength='1' size='1' onChange={handleChange}></input>
  );

}