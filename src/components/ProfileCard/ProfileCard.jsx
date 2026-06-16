import { MapPin, Link as LinkIcon, Calendar, Building2, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const ProfileCard = ({ user }) => (
  <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl
    bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 mb-4">
    <div className="flex-shrink-0">
      <img
        src={user.avatar_url}
        alt={`Аватар ${user.login}`}
        className="w-28 h-28 rounded-full ring-2 ring-indigo-500/30 mx-auto sm:mx-0"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name || user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-500 font-mono text-sm hover:underline"
          >
            @{user.login}
          </a>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label="Открыть профиль на GitHub"
          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400
            hover:text-indigo-500 transition-colors"
        >
          <ExternalLink size={14} />
          GitHub
        </a>
      </div>

      {user.bio && (
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {user.bio}
        </p>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-500 dark:text-gray-500">
        {user.location && (
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {user.location}
          </span>
        )}
        {user.company && (
          <span className="flex items-center gap-1">
            <Building2 size={14} />
            {user.company}
          </span>
        )}
        {user.blog && (
          <a
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
          >
            <LinkIcon size={14} />
            {user.blog.replace(/^https?:\/\//, '')}
          </a>
        )}
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          На GitHub с {formatDate(user.created_at)}
        </span>
      </div>
    </div>
  </div>
);

export default ProfileCard;
