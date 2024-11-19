
export const Stepper = ({ currentStep }: { currentStep: number }) => {
    const steps = ['Assessment Details', 'Select Questions', 'Review & Submit'];

    return (
        <div className="flex items-center justify-between w-full lg:w-2/3 mx-auto py-4">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    {/* Step Number */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep === index + 1 ? 'bg-black text-white' : 'text-black border-gray-400 border'
                            }`}
                        style={{ minWidth: '2rem', minHeight: '2rem' }}
                    >
                        {index + 1}
                    </div>

                    {/* Step Label */}
                    <span
                        className={`ml-2 font-semibold ${currentStep === index + 1 ? 'text-black' : 'text-gray-500'
                            }`}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {step}
                    </span>

                    {/* Divider Line */}
                    {index < steps.length - 1 && (
                        <div className="flex items-center mx-4 w-12 lg:w-24">
                            <div className={`w-full h-1 ${currentStep > index + 1 ? 'bg-black' : 'bg-gray-400'}`} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
