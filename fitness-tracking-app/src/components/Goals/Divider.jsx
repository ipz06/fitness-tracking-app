 const DividerHeader =  ({heading}) => {
   return (
      <div style={{
         'text-align':'center',
         'border-bottom':'1px solid #CCCCCC' ,
         'margin-bottom':'10px'
         
      }}>
         <h2 style ={{
            'top':'11px',
            'display':'inline-block',
            'color':'#6D717A',
            'background':'#FFFFFF',
            'padding': '0 10px',
            'position': 'relative',
            'text-transform':'upper-case'
         }}>
            <span>{heading.toUpperCase()}</span>
         </h2>
      </div>
   )
}

export default DividerHeader