import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa'; // For the send icon
import { CiSearch } from "react-icons/ci"; // For the search icon
import { IoIosCloseCircleOutline } from "react-icons/io"; // For clearing search

export default function StandaloneChatPage() {
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Mock Data for Chat Contacts (Companies)
  const [chatContacts, setChatContacts] = useState([
    {
      id: '1',
      companyName: 'Swift Shipping',
      lastMessage: 'And Send me the photo...',
      unreadCount: 3,
      imageUrl: 'https://placehold.co/40x40/FF7F50/FFFFFF?text=SS' // Mock image for Swift Shipping
    },
    {
      id: '2',
      companyName: 'Global Logistics',
      lastMessage: 'Okay, we will proceed.',
      unreadCount: 0,
      imageUrl: 'https://placehold.co/40x40/4682B4/FFFFFF?text=GL' // Mock image for Global Logistics
    },
    {
      id: '3',
      companyName: 'Express Cargo',
      lastMessage: 'Confirming delivery.',
      unreadCount: 1,
      imageUrl: 'https://placehold.co/40x40/32CD32/FFFFFF?text=EC' // Mock image for Express Cargo
    },
    {
      id: '4',
      companyName: 'Ocean Freight Co.',
      lastMessage: 'Regarding your shipment...',
      unreadCount: 0,
      imageUrl: 'https://placehold.co/40x40/8A2BE2/FFFFFF?text=OF' // Mock image for Ocean Freight Co.
    },
  ]);

  // Mock Data for Messages
  const [messages, setMessages] = useState({
    '1': [
      { from: 'Swift Shipping', text: 'hello.shipmnts will be packaged' },
      { from: 'Me', text: 'ok ,that is good' },
      { from: 'Swift Shipping', text: 'We will send you the tracking details soon.' },
    ],
    '2': [
      { from: 'Global Logistics', text: 'Your package is ready for pickup.' },
      { from: 'Me', text: 'Great, thanks!' },
    ],
    '3': [
      { from: 'Express Cargo', text: 'The delivery was completed successfully.' },
    ],
    '4': [
      { from: 'Ocean Freight Co.', text: 'We are reviewing your request.' },
    ],
  });

  const [activeChatId, setActiveChatId] = useState(chatContacts[0]?.id || ''); // Set first contact as active by default
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle

  // Scroll to the latest message whenever messages or active chat changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChatId]);

  // Handle sending a message
  const onSend = () => {
    if (input.trim() && activeChatId) {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [
          ...(prev[activeChatId] || []),
          { from: 'Me', text: input, sentAt: new Date().toISOString() },
        ],
      }));
      setInput('');
      // Simulate a response from the other party (optional)
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [activeChatId]: [
            ...(prev[activeChatId] || []),
            { from: chatContacts.find(c => c.id === activeChatId)?.companyName, text: 'Got it!' },
          ],
        }));
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line in textarea if it were one
      onSend();
    }
  };

  // Filter contacts based on search term
  const filteredContacts = chatContacts.filter(contact =>
    contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChatContact = chatContacts.find(c => c.id === activeChatId);

  return (
    <div className="bg-[#E4E6EC] h-screen flex flex-col p-4 sm:p-6 md:p-8">
      {/* Header for mobile view */}
      <div className="flex items-center justify-between gap-2 mb-4 md:hidden">
        <button
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
        </button>
        <h3 className="text-xl font-bold text-[#1A3D65] flex-1 text-center">Contact</h3>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md"
          aria-label="Toggle sidebar"
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden gap-4">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center text-[#1A3D65] gap-2 font-semibold text-base sm:text-lg">
            <FaChevronLeft
              className="cursor-pointer text-xl"
              onClick={() => navigate(-1)}
            />
            <span>Chat</span>
          </div>
        </div>
        {/* Sidebar (Search + List) */}
        <div
          className={`
            w-full md:w-1/3 max-w-[280px] flex-shrink-0
            ${sidebarOpen ? 'block' : 'hidden'} md:block
            absolute md:static top-16 left-4 right-4 z-50
            bg-[#fdfbfa] rounded-xl shadow-lg md:shadow-none
            h-[calc(100%-80px)] md:h-auto overflow-hidden
          `}
        >
          {/* Search Box */}
          <div className="p-3">
            <div className="relative flex items-center border border-brandOrange rounded-full px-4 py-2">
              <CiSearch className="text-xl text-brandOrange absolute left-3" />
              <input
                type="text"
                placeholder="Search For ID or Company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-8 text-sm focus:outline-none bg-transparent"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 text-brandOrange">
                  <IoIosCloseCircleOutline size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Companies List */}
          <div className="space-y-2 px-3 pb-3 overflow-y-auto h-[calc(100%-70px)]">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setActiveChatId(contact.id);
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`cursor-pointer px-3 py-2 rounded-xl flex items-center gap-3 transition-colors duration-200 ${contact.id === activeChatId
                      ? 'bg-secondryOrange'
                      : 'bg-white border border-borderGray hover:bg-gray-50'
                    }`}
                >
                  <img
                    src={contact.imageUrl}
                    alt={contact.companyName}
                    className="w-10 h-10 object-cover rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 flex items-center justify-between gap-2 overflow-hidden min-w-0">
                    <div className="flex flex-col overflow-hidden min-w-0">
                      <span className="text-gray-800 font-medium truncate">{contact.companyName}</span>
                      <span className="text-gray-500 text-xs truncate">{contact.lastMessage}</span>
                    </div>
                    {contact.unreadCount > 0 && (
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                        +{contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center pt-3">No results found.</p>
            )}
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex-1 bg-white rounded-xl p-4 flex flex-col justify-between shadow-lg">
          {activeChatId ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 mb-4 border-b-2 border-borderGray pb-2">
                <button
                  onClick={() => setSidebarOpen(true)} // Open sidebar on mobile
                  className="p-2 rounded-md md:hidden"
                  aria-label="Open sidebar"
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
                <img
                  src={activeChatContact?.imageUrl}
                  alt={activeChatContact?.companyName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h3 className="text-xl font-bold text-[#1A3D65]">{activeChatContact?.companyName}</h3>
              </div>

              {/* Messages Display Area */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {((messages && messages[activeChatId]) || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`text-sm flex ${msg.from === 'Me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-xl whitespace-pre-line max-w-[70%] ${msg.from === 'Me'
                          ? 'bg-secondryOrange text-primaryBlack'
                          : 'border border-secondryOrange text-gray-700'
                        }`}
                    >
                      <p className="text-xs font-semibold text-brandOrange mb-1">
                        {msg.from}
                      </p>
                      <p className="font-normal text-gray-800">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input & Send Button */}
              <div className="flex items-center gap-2 mt-2">
                <div className="relative flex items-center border border-brandOrange rounded-full px-4 py-2 flex-1">
                  <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 text-brandOrange">
                    <path d="M10.6275 15.6675C13.7655 15.4598 16.2645 12.9248 16.47 9.74251C16.5098 9.12001 16.5098 8.47501 16.47 7.85251C16.2645 4.67101 13.7655 2.13751 10.6275 1.92826C9.54369 1.85684 8.45634 1.85684 7.37251 1.92826C4.23451 2.13676 1.73551 4.67101 1.53001 7.85326C1.49028 8.48264 1.49028 9.11389 1.53001 9.74326C1.60501 10.902 2.11726 11.9753 2.72101 12.8813C3.07126 13.515 2.84026 14.3063 2.47501 14.9985C2.21251 15.4973 2.08051 15.7463 2.18626 15.9263C2.29126 16.1063 2.52751 16.1123 2.99926 16.1235C3.93301 16.146 4.56226 15.882 5.06176 15.5138C5.34451 15.3045 5.48626 15.2003 5.58376 15.1883C5.68126 15.1763 5.87401 15.2558 6.25801 15.4133C6.60301 15.5558 7.00426 15.6435 7.37176 15.6683C8.44051 15.7388 9.55726 15.7388 10.6283 15.6683M8.99626 9.00001H9.00376M11.9933 9.00001H12M6.00001 9.00001H6.00676" stroke="#F9751C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                <button
                  onClick={onSend}
                  className="bg-brandOrange hover:bg-orange-600 text-white p-3 rounded-full flex items-center justify-center transition duration-200"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="text-lg" />
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
