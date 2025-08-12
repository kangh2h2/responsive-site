
import { useEffect, useState } from 'react';
import { prRepo } from '../repos';

const empty = { title:'', date:'', youtubeId:'', externalUrl:'' };

export default function AdminPRDummy() {
  const [form, setForm] = useState(empty);
  const [rows, setRows] = useState([]);

  async function load() {
    const { items } = await prRepo.list(1, 9999);
    setRows(items);
  }
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.title || !form.date) return alert('제목/날짜는 필수');
    if (!form.youtubeId && !form.externalUrl) return alert('YouTube ID 또는 외부 URL 중 하나');

    if (form.id) {
      await prRepo.update(form.id, form);
    } else {
      await prRepo.create({ ...form, createdAt:'', updatedAt:'' });
    }
    setForm(empty);
    load();
  };

  const edit = (row) => setForm(row);
  const remove = async (id) => {
    if (!confirm('삭제할까요?')) return;
    await prRepo.remove(id);
    load();
  };

  return (
    <div style={{padding:20}}>
      <h2>PR 관리(임시, localStorage)</h2>

      <div style={{display:'grid', gap:8, maxWidth:480}}>
        <input placeholder="제목" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
        <input placeholder="YouTube ID (택1)" value={form.youtubeId} onChange={e=>setForm({...form, youtubeId:e.target.value, externalUrl:''})}/>
        <input placeholder="외부 URL (택1)" value={form.externalUrl} onChange={e=>setForm({...form, externalUrl:e.target.value, youtubeId:''})}/>
        <div style={{display:'flex', gap:8}}>
          <button onClick={save}>{form.id ? '수정' : '추가'}</button>
          <button onClick={()=>setForm(empty)}>리셋</button>
        </div>
      </div>

      <hr style={{margin:'24px 0'}} />

      <ul>
        {rows.map(r => (
          <li key={r.id} style={{marginBottom:8}}>
            <b>{r.title}</b> <small>({r.date})</small>
            <button style={{marginLeft:8}} onClick={()=>edit(r)}>수정</button>
            <button style={{marginLeft:4}} onClick={()=>remove(r.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
