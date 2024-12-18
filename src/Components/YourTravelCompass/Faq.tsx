import React from 'react';

export const Faq = () => {
    return (
        <div>
            <div className='text-center'>
                <h1 className='font-semibold text-xl mt-10 '>Most Common Questions</h1>
            </div>

            <div className="collapse collapse-plus bg-base-200 mb-3 mt-6">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">What documents do I need for international travel?</div>
                <div className="collapse-content">
                    <p>You will typically need a valid passport, visa (if required), flight tickets, travel insurance, and any required vaccination certificates.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200  mb-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">How do I choose the best travel insurance?</div>
                <div className="collapse-content">
                    <p>Choose a plan that covers medical emergencies, trip cancellations, lost baggage, and personal liability. Compare plans to find one that meets your needs.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200  mb-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">What are the best tips for packing efficiently?</div>
                <div className="collapse-content">
                    <p>Use packing cubes, roll your clothes, and pack versatile outfits. Carry essential items like chargers, medications, and travel documents in your carry-on.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200  mb-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">How can I find affordable flights?</div>
                <div className="collapse-content">
                    <p>Book early, use flight comparison websites, and consider flexible travel dates. Sign up for airline newsletters to catch deals and discounts.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mb-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">What should I do if my luggage is lost?</div>
                <div className="collapse-content">
                    <p>Report the loss immediately to the airline's baggage service. Provide details of your bag and contact information. Keep receipts for essential items you purchase while waiting.</p>
                </div>
            </div>
        </div>
    );
};
