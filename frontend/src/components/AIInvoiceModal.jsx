import React, { useEffect, useState } from 'react';
import { aiInvoiceModalStyles } from '../assets/dummyStyles.js';
import GeminiIcon from './GeminiIcon.jsx';
import AnimatedButton from '../assets/GenerateBtn/Gbtn.jsx';

const AIInvoiceModal = ({open,onClose,onGenerate,initialText=""}) => {

    const [text,setText]=useState(initialText || "");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    useEffect(()=>{
        setText(initialText || "");
        setError("");
        setLoading(false);
    },[open,initialText]);

    if(!open) return null;

    async function handleGenerateClick() {
        setError("");
        const raw=(text || "").trim();
        if(!raw){
            setError("Please paste invoice text to generate from AI.");
            return ; 
        }

        try {
            setLoading(true);
            const maybePromise=onGenerate && onGenerate(raw);
            if(maybePromise && typeof maybePromise.then==="function"){
                await maybePromise;
            }
        } catch (err) {
            console.error("onGenerate handler failed:",err);
            const msg= err && (err.message || (typeof err==="string" ? err:JSON.stringify(err)));
            setError(msg || "Failed to generate. Try again");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className={aiInvoiceModalStyles.overlay}>
        <div className={aiInvoiceModalStyles.backdrop} 
        onClick={()=>onClose && onClose()}> </div>

        <div className={aiInvoiceModalStyles.modal}>
            <div className='flex items-start justify-between'>
                <div>
                    <h3 className={aiInvoiceModalStyles.title}>
                        <GeminiIcon className='w-6 h-6 group-hover:scale-110 transition-trasform flex-none' /> 
                        Create Invoice with AI
                    </h3>
                    <p className={aiInvoiceModalStyles.description}>
                        Paste the invoice text you have, and let our AI do the magic of creating a structured invoice for you.
                    </p>
                </div>
                <button onClick={()=>onClose && onClose()}
                    className={aiInvoiceModalStyles.closeButton}>  
                                    ✕
                      </button>
                      </div>

                      <div className='mt-4'>
                        <label className={aiInvoiceModalStyles.label}>Paste invoice text</label>
                        <textarea value={text} onChange={(e)=>setText(e.target.value)}
                            placeholder={`eg. A person wants a logo design for her organic brand "GreenVibe.in" Quoted for $120 for 2 logo options and final delivery in PNG and vector format`} 
                             rows={8}
                             className={aiInvoiceModalStyles.textarea}
                             ></textarea>
                      </div>

                      {error && (
                          
      
          <div className={aiInvoiceModalStyles.error} role="alert">
            {String(error)
              .split("\n")
              .map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            {(/quota|exhausted|resource_exhausted/i.test(String(error)) && (
              <div style={{ marginTop: 8, fontSize: 13, color: "#374151" }}>
                Tip: AI is temporarily unavailable (quota). Try again in a few
                minutes, or create the invoice manually.
              </div>
            )) ||
              null}
          </div>
           )}

           <div className={aiInvoiceModalStyles.actions}>
            <AnimatedButton 
             onClick={handleGenerateClick}
             isLoading={loading}
             disabled={loading}
             label='Generate'
            />

           </div>

        </div>
      
    </div>
  )
}

export default AIInvoiceModal
