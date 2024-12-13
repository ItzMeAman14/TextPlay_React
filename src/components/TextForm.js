import React,{useState} from 'react'

export default function TextForm(props) {
    const getWords = () => {
        let val = text.split(/\s+/).filter((char) => {return char.length !== 0}).length;
        return val;
    }

    const handleUpClick = () => {
        setText(text.toUpperCase());
        props.showAlert("Converted to Upppercase","success");
    }
    
    const handleLowClick = () => {
        setText(text.toLowerCase());
        props.showAlert("Converted to Lowercase","success");
    }
    
    const handleClearClick = () => {
        setText('');
        props.showAlert("Text Cleared","success");
    }
    
    const handleRemoveSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed Extra Spaces","success");
    }
    
    const handleCopy = () => {
        
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard","success");
    }
    
    const handleCapitalize = () => {
        let newText = text[0].toUpperCase();
        let newLineMatch = [...text.matchAll(/\n/g)];
        let indices = newLineMatch.map(match => match.index);

        for(let i=1;i<text.length;i++){
            if(!indices.includes(i)){

                if(text[i]===" "){
                    newText += " " + text[i+1].toUpperCase();
                    i++;
                    }
                    else{
                        newText += text[i].toLowerCase();
                    }
                    if(i===text.length-1){
                        break;
                    }
            }
            else{
                newText += "\n";
            }
        }

        for(let i of indices){
            newText = newText.slice(0,i+1)+newText[i+1].toUpperCase()+newText.slice(i+2);
        }
        setText(newText);
        props.showAlert("Text is Summarized Successfully","success");
    }
    
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    const [text,setText] = useState("Hello I am Aman")
  return (
    <>

    <div className="container">
        <h1 className={`text-${props.mode === 'light' ? 'dark' : 'light'}`}>{props.heading}</h1>
        <div className={`mb-3`}>
            <textarea className={`form-control bg-${props.mode} text-${props.mode === 'light' ? 'dark' : 'light'}`} value={text} onChange={handleOnChange} id="myBox" rows="8" placeholder='Enter your text here'></textarea>
        </div>
        <button disabled={text.length === 0} className={`btn btn-outline-${props.mode === 'light' ? 'success' : 'info'} mx-1`} onClick={handleUpClick} >Convert to Uppercase</button>
        <button disabled={text.length === 0} className={`btn btn-outline-${props.mode === 'light' ? 'success' : 'info'} mx-1`} onClick={handleLowClick}>Convert to Lowercase</button>
        <button disabled={text.length === 0} className={`btn btn-outline-${props.mode === 'light' ? 'success' : 'info'} mx-1`} onClick={handleRemoveSpaces}>Remove Extra Spaces</button>
        <button disabled={text.length === 0} className={`btn btn-outline-${props.mode === 'light' ? 'success' : 'info'} mx-1`} onClick={handleCapitalize}>Summarize</button>
        <button disabled={text.length === 0} className={`btn btn-outline-${props.mode === 'light' ? 'success' : 'info'} mx-1`} onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length === 0} className={`btn btn-outline-${props.mode === 'light' ? 'success' : 'info'} mx-1`} onClick={handleCopy}>Copy text</button>
    </div>
    
    <div className={`cont my-3 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
        <h1>Your text Summary</h1>
        <p>{getWords()} words and {text.length} characters</p>
        <p>{ (0.008 * (text.split(" ").length)).toFixed(2) } minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length === 0 ? "Enter text to preview" : text}</p>
    </div>

    </>
  )
}
