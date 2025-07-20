import React, { useRef, useEffect, useState } from 'react';
import imgCompany from '../../assets/Rectangle 2.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useOffers } from '../../Context/OffersContext'; // أو حسب مسار الكونتكست عندك

export default function ChatPanel({ onBack, }) {
  const chatEndRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { offers, messages, activeChatId, setActiveChatId, input, setInput, onSend } = useOffers();

  const { id: paramId } = useParams();
  const activeId = activeChatId || paramId;
  const activeOffer = offers.find(o => o.id === activeId);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeId]);
  useEffect(() => {
    if (!activeId && paramId) {
      setActiveChatId(paramId);

    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeId, paramId, setActiveChatId]);

  console.log("offers", offers);


  // ✅ تأكدي إن offers موجودة قبل الاستخدام
  if (!offers || !Array.isArray(offers)) {
    return <div className="text-red-500 p-4">Offers not available</div>;
  }

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSend();
  };

  const filteredMessages = Object.keys(messages || {}).filter(id => {
    const companyName = offers.find(o => o.id === id)?.company || '';
    return companyName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-customGray  h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* زر البورجر - يظهر فقط على الشاشات الصغيرة */}
        <div className='flex items-center justify-between '>  <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Go back"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.875 4.75C11.875 4.75 7.125 8.24838 7.125 9.5C7.125 10.7516 11.875 14.25 11.875 14.25"
              stroke="#10233E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>   <h3 className="text-xl font-bold text-[#1A3D65] flex-1 text-center">Contact</h3></div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md md:hidden"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* العنوان */}


        {/* زر الرجوع */}


      </div>



      <div className="flex-1 flex flex-col md:flex-row overflow-hidden gap-4">
        {/* Sidebar (Search + List) */}
        <div className="w-full md:w-1/3 max-w-[280px]">
          {/* Search Box (Always visible) */}
          <div className="bg-[#fdfbfa] p-3 rounded-lg mb-2">
            <input
              type="text"
              placeholder="Search For ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-full border border-brandOrange focus:outline-none"
            />
          </div>

          {/* Companies List (togglable on mobile) */}
          <div
            className={`
    bg-[#fdfbfa] rounded-lg overflow-y-auto transition-all duration-300
    absolute top-16 left-4 right-4 z-50 shadow-md
    ${sidebarOpen ? 'block' : 'hidden'} 
    md:static md:block md:top-auto md:left-auto md:right-auto md:shadow-none
    max-h-[300px] md:max-h-[calc(100vh-200px)]
  `}
          >

            <div className="space-y-2 px-3 pb-3 max-h-[300px] md:max-h-[calc(100vh-200px)] overflow-y-auto">
              <div
                className={`bg-[#fdfbfa] rounded-lg overflow-y-auto transition-all duration-300 md:block ${sidebarOpen ? 'block' : 'hidden'
                  }`}
              />

              {filteredMessages.map(id => {
                const offer = offers.find(o => o.id === id);
                const company = offer?.company;

                return (
                  <div
                    key={id}
                    onClick={() => {
                      setActiveChatId(id);
                      setSidebarOpen(false);
                    }}

                    className={`cursor-pointer px-3 py-2 rounded-xl flex items-center gap-3 ${id === activeId
                        ? 'bg-secondryOrange'
                        : 'bg-white border border-borderGray'
                      }`}
                  >
                    {/* الصورة */}
                    <img
                      src={imgCompany}
                      alt="Company Cover"
                      className="w-10 h-10 object-cover  flex-shrink-0"
                    />

                    {/* النصوص + عدد الرسائل */}
                    <div className="flex-1 flex items-center justify-between gap-2 overflow-hidden min-w-0">
                      {/* النصوص */}
                      <div className="flex flex-col overflow-hidden min-w-0">
                        <span className="text-gray-800 font-medium truncate">{company}</span>
                        <span className="text-gray text-xs truncate">
                          {messages[id]?.slice(-1)[0]?.text || 'Last message...'}
                        </span>
                      </div>

                      {/* العدد (افتراضي 3) */}
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        +{messages[id]?.length || 0}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredMessages.length === 0 && (
                <p className="text-sm text-gray-400 text-center pt-3">No results</p>
              )}
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex-1 bg-white rounded-xl p-4 flex flex-col justify-between">
          {activeId ? (
            <>
              <h3 className="text-xl font-bold text-start text-[#1A3D65] mb-4 border-b-2 border-borderGray pb-2">
                {activeOffer?.company}
              </h3>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {((messages && messages[activeId]) || []).map((msg, idx) => (

                  <div
                    key={idx}
                    className={`text-sm ${msg.from === 'Me' ? 'ml-auto text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-xl whitespace-pre-line ${msg.from === 'Me'
                          ? 'bg-secondryOrange text-primaryBlack'
                          : 'border border-secondryOrange text-gray-700'
                        }`}
                    >
                      <p className="text-xs font-semibold text-brandOrange mb-1">
                        {msg.from === 'Me' ? 'Me' : activeOffer?.company}
                      </p>
                      <p className="font-normal text-gray">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input & Send Button */}
              <div className="flex items-center gap-2 mt-2">
                {/* Input with icon */}
                <div className="relative flex items-center border border-brandOrange rounded-full px-4 py-2 flex-1">

                  <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6275 15.6675C13.7655 15.4598 16.2645 12.9248 16.47 9.74251C16.5098 9.12001 16.5098 8.47501 16.47 7.85251C16.2645 4.67101 13.7655 2.13751 10.6275 1.92826C9.54369 1.85684 8.45634 1.85684 7.37251 1.92826C4.23451 2.13676 1.73551 4.67101 1.53001 7.85326C1.49028 8.48264 1.49028 9.11389 1.53001 9.74326C1.60501 10.902 2.11726 11.9753 2.72101 12.8813C3.07126 13.515 2.84026 14.3063 2.47501 14.9985C2.21251 15.4973 2.08051 15.7463 2.18626 15.9263C2.29126 16.1063 2.52751 16.1123 2.99926 16.1235C3.93301 16.146 4.56226 15.882 5.06176 15.5138C5.34451 15.3045 5.48626 15.2003 5.58376 15.1883C5.68126 15.1763 5.87401 15.2558 6.25801 15.4133C6.60301 15.5558 7.00426 15.6435 7.37176 15.6683C8.44051 15.7388 9.55726 15.7388 10.6283 15.6683M8.99626 9.00001H9.00376M11.9933 9.00001H12M6.00001 9.00001H6.00676" stroke="#F9751C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>


                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your feedback"
                    className="flex-1 pl-10 text-sm focus:outline-none bg-transparent"
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={onSend}
                  className="bg-brandOrange hover:bg-orange-600 text-white p-3 rounded-full flex items-center justify-center transition duration-200"
                  aria-label="Send message"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.985 15.408L15.227 19.094C16.427 20.459 17.028 21.142 17.657 20.975C18.285 20.809 18.501 19.911 18.932 18.114L21.322 8.14601C21.987 5.37801 22.319 3.99501 21.581 3.31201C20.843 2.62901 19.564 3.13701 17.006 4.15201L5.13998 8.86501C3.09398 9.67801 2.07099 10.084 2.00599 10.782C1.99833 10.8531 1.99833 10.9249 2.00599 10.996C2.06899 11.695 3.08998 12.104 5.13398 12.923C6.05898 13.294 6.52199 13.48 6.85399 13.835C6.89132 13.875 6.92732 13.9163 6.96199 13.959C7.26799 14.339 7.39799 14.839 7.65899 15.835L8.14798 17.702C8.40098 18.672 8.52799 19.158 8.86099 19.224C9.19399 19.29 9.48299 18.888 10.062 18.083L11.985 15.408Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
