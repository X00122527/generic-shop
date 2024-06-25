import React, {useEffect, useState} from 'react'

function Accordion({title, text, isOp}) {
    const [isOpen, setIsOpen] = useState(undefined);

    useEffect(() => {
        setIsOpen(isOp)
    }, []);
    
    const handleAccordion = () => {
        console.log(isOpen);
        setIsOpen(!isOpen);
    }

    return (
        <div 
        onClick={handleAccordion}

        id="accordion-collapse" data-accordion="collapse" className='my-4' >
            <div id="accordion-collapse-heading-1" className="relative inline-flex items-center w-full" data-accordion-target="#accordion-collapse-body-1" 
            aria-expanded={isOpen} 
            aria-controls="accordion-collapse-body-1">
                <span className='text-xl font-semibold'>{title}</span>
                <svg data-accordion-icon className={`absolute right-0 w-3 h-3 shrink-0 ${isOpen ? "rotate-180": ""}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>

            </div>
            {isOpen &&
            <div id="accordion-collapse-body-1"  aria-labelledby="accordion-collapse-heading-1">
                <div className="py-2">
                    <p className="mb-2">{text}</p>
                </div>
            </div>
}
        </div>
    )
}

export default Accordion