import { useState } from 'react'
import { User, Send, CheckCircle } from 'lucide-react'

const dummyConversations = [
  {
    id: 1,
    name: 'Carlos Silva',
    lastMessage: 'Obrigado pelo retorno!',
    lastTime: '10:32',
    unread: 2,
    messages: [
      { from: 'client', text: 'Olá, gostaria de saber sobre meu reembolso.', time: '10:00' },
      { from: 'admin', text: 'Olá Carlos! Seu reembolso está em análise.', time: '10:05' },
      { from: 'client', text: 'Obrigado pelo retorno!', time: '10:32' }
    ]
  },
  {
    id: 2,
    name: 'Maria Silva',
    lastMessage: 'Enviei os documentos!',
    lastTime: '09:50',
    unread: 0,
    messages: [
      { from: 'client', text: 'Enviei os documentos!', time: '09:50' },
      { from: 'admin', text: 'Recebido, Maria! Vamos analisar.', time: '09:51' }
    ]
  },
  {
    id: 3,
    name: 'Ana Souza',
    lastMessage: 'Posso marcar consulta?',
    lastTime: 'Ontem',
    unread: 1,
    messages: [
      { from: 'client', text: 'Posso marcar consulta?', time: 'Ontem' },
      { from: 'admin', text: 'Claro! Qual especialidade?', time: 'Ontem' }
    ]
  }
]

export default function ChatPage() {
  const [selected, setSelected] = useState(0)
  const [input, setInput] = useState('')
  const conversation = dummyConversations[selected]

  return (
    <div className="flex h-[70vh] bg-white rounded-xl shadow-lg border border-vfb-gray-100 overflow-hidden">
      {/* Lista de conversas */}
      <aside className="w-1/3 min-w-[220px] max-w-xs bg-vfb-bg-card border-r border-vfb-gray-100 flex flex-col">
        <div className="p-4 border-b border-vfb-gray-100 font-bold text-vfb-blue-900 text-lg">Conversas</div>
        <div className="flex-1 overflow-y-auto">
          {dummyConversations.map((conv, idx) => (
            <button
              key={conv.id}
              onClick={() => setSelected(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-vfb-gray-50 transition-colors text-left ${selected === idx ? 'bg-vfb-blue-50' : 'hover:bg-vfb-gray-50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-vfb-cyan-100 flex items-center justify-center">
                <User className="h-5 w-5 text-vfb-cyan-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-vfb-text-primary truncate">{conv.name}</div>
                <div className="text-xs text-vfb-text-tertiary truncate">{conv.lastMessage}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-vfb-text-tertiary">{conv.lastTime}</span>
                {conv.unread > 0 && (
                  <span className="bg-vfb-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold">{conv.unread}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </aside>
      {/* Histórico de mensagens */}
      <section className="flex-1 flex flex-col bg-white" style={{ width: '70%' }}>
        <div className="p-4 border-b border-vfb-gray-100 font-bold text-vfb-blue-900 text-lg flex items-center gap-3">
          <User className="h-6 w-6 text-vfb-cyan-600" />
          {conversation.name}
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-vfb-bg-card">
          {conversation.messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-xl px-4 py-2 max-w-xs text-sm shadow ${msg.from === 'admin' ? 'bg-vfb-blue-600 text-white' : 'bg-white border border-vfb-gray-100 text-vfb-text-primary'}`}>
                {msg.text}
                <div className="text-xs text-vfb-text-tertiary mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form className="flex items-center gap-2 p-4 border-t border-vfb-gray-100 bg-white" onSubmit={e => { e.preventDefault(); if(input){ setInput(''); } }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 px-4 py-2 rounded-lg border border-vfb-gray-200 focus:ring-2 focus:ring-vfb-blue-500 focus:border-vfb-blue-500 text-sm"
          />
          <button type="submit" className="bg-vfb-blue-600 hover:bg-vfb-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2">
            <Send className="h-4 w-4" />
            Enviar
          </button>
        </form>
      </section>
    </div>
  )
} 