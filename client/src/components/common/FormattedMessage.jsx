import React from 'react';

/**
 * Parses inline formatting like **bold**, *italic*, and `code`
 * Stripping raw markdown symbols so they never leak into the UI.
 */
function renderInline(text, isDark = false) {
  if (!text) return null;

  // Split by code spans `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, pIdx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={pIdx}
          className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${
            isDark ? 'bg-slate-800 text-brand-300' : 'bg-slate-100 text-slate-800 font-medium'
          }`}
        >
          {codeContent}
        </code>
      );
    }

    // Process bold **...** and *...* inside normal segments
    const boldParts = part.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return boldParts.map((segment, bIdx) => {
      if (
        (segment.startsWith('**') && segment.endsWith('**') && segment.length > 4) ||
        (segment.startsWith('*') && segment.endsWith('*') && segment.length > 2)
      ) {
        const cleanBold = segment.replace(/^\*+|\*+$/g, '');
        return (
          <strong
            key={`${pIdx}-${bIdx}`}
            className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            {cleanBold}
          </strong>
        );
      }

      // Clean any accidental leftover raw asterisks or backticks
      const cleanSegment = segment.replace(/\*\*/g, '').replace(/`/g, '');
      return <React.Fragment key={`${pIdx}-${bIdx}`}>{cleanSegment}</React.Fragment>;
    });
  });
}

/**
 * FormattedMessage - Renders bot responses cleanly section-wise
 * Eliminates raw '###', '**', '---' and renders clear topic headings,
 * sub-topics, numbered lists, bullet points, and tables.
 */
export default function FormattedMessage({ content = '', isDark = false }) {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }
  let currentTable = null; // { headers: [], rows: [] }

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push({ ...currentList });
      currentList = null;
    }
  };

  const flushTable = () => {
    if (currentTable && currentTable.rows.length > 0) {
      blocks.push({ ...currentTable });
      currentTable = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Skip completely empty lines, flushing pending lists/tables
    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    // 2. Horizontal Rules / Dividers (e.g. ---, ***, ____)
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushList();
      flushTable();
      blocks.push({ type: 'divider' });
      continue;
    }

    // 3. Table Rows (e.g. | col1 | col2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());

      // If it's a separator line (|:---|:---|), skip it
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!currentTable) {
        currentTable = { type: 'table', headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // 4. Headings (###, ##, #, or "Topic:")
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const headingText = headingMatch[2].replace(/\*\*/g, '').trim();
      blocks.push({
        type: 'heading',
        level: level <= 2 ? 'topic' : 'subtopic',
        text: headingText,
      });
      continue;
    }

    // Check for explicit "Topic:" or "Sub-Topic:" style text
    const labelHeadingMatch = trimmed.match(/^(Topic|Sub-Topic|Phase\s+\d+|Step\s+\d+):\s*(.*)$/i);
    if (labelHeadingMatch) {
      flushList();
      blocks.push({
        type: 'heading',
        level: 'subtopic',
        text: `${labelHeadingMatch[1]}: ${labelHeadingMatch[2].replace(/\*\*/g, '').trim()}`,
      });
      continue;
    }

    // 5. Numbered List (e.g. 1. Item, 2) Item, etc.)
    const numberMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push({
        num: numberMatch[1],
        text: numberMatch[2],
      });
      continue;
    }

    // 6. Bullet List (e.g. - Item, * Item, • Item)
    const bulletMatch = trimmed.match(/^[-*•+]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push({
        text: bulletMatch[1],
      });
      continue;
    }

    // 7. Regular Paragraph text
    flushList();
    blocks.push({
      type: 'paragraph',
      text: trimmed,
    });
  }

  flushList();
  flushTable();

  return (
    <div className={`space-y-3 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      {blocks.map((block, idx) => {
        // Headings: Topic & Sub-Topic
        if (block.type === 'heading') {
          if (block.level === 'topic') {
            return (
              <div key={idx} className="pt-2 first:pt-0">
                <h3
                  className={`text-sm sm:text-base font-bold tracking-tight pb-1 border-b ${
                    isDark
                      ? 'text-white border-slate-700/80'
                      : 'text-slate-900 border-slate-200'
                  }`}
                >
                  {renderInline(block.text, isDark)}
                </h3>
              </div>
            );
          }
          return (
            <div key={idx} className="pt-1.5 first:pt-0">
              <h4
                className={`text-xs sm:text-sm font-semibold tracking-tight ${
                  isDark ? 'text-slate-200' : 'text-slate-900'
                }`}
              >
                {renderInline(block.text, isDark)}
              </h4>
            </div>
          );
        }

        // Horizontal Rule
        if (block.type === 'divider') {
          return (
            <div
              key={idx}
              className={`my-3 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200/80'
              }`}
            />
          );
        }

        // Numbered List
        if (block.type === 'ol') {
          return (
            <ol key={idx} className="space-y-2 my-2 pl-0.5">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center mt-0.5 select-none ${
                      isDark
                        ? 'bg-slate-800 text-brand-300 border border-slate-700'
                        : 'bg-brand-50 text-brand-700 border border-brand-200/80'
                    }`}
                  >
                    {item.num}
                  </span>
                  <div className="flex-1 pt-0.5">{renderInline(item.text, isDark)}</div>
                </li>
              ))}
            </ol>
          );
        }

        // Bullet List
        if (block.type === 'ul') {
          return (
            <ul key={idx} className="space-y-1.5 my-2 pl-1">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                  <span
                    className={`shrink-0 text-base leading-none mt-1 select-none ${
                      isDark ? 'text-brand-400' : 'text-brand-600'
                    }`}
                  >
                    •
                  </span>
                  <div className="flex-1">{renderInline(item.text, isDark)}</div>
                </li>
              ))}
            </ul>
          );
        }

        // Markdown Table
        if (block.type === 'table') {
          return (
            <div
              key={idx}
              className={`overflow-x-auto my-3 rounded-xl border ${
                isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
              }`}
            >
              <table className="w-full text-left text-xs border-collapse">
                {block.headers.length > 0 && (
                  <thead>
                    <tr
                      className={`border-b ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {block.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-3 py-2 font-semibold">
                          {renderInline(h, isDark)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {block.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`border-b last:border-b-0 ${
                        isDark
                          ? 'border-slate-800/80 hover:bg-slate-800/40 text-slate-300'
                          : 'border-slate-100 hover:bg-slate-50/60 text-slate-700'
                      }`}
                    >
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2">
                          {renderInline(cell, isDark)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p
            key={idx}
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}
          >
            {renderInline(block.text, isDark)}
          </p>
        );
      })}
    </div>
  );
}
