import classNames from 'classnames'
import allFilters from '../config/filters'
import analytics from '../lib/analytics'
import { useEffect } from 'react'
import FilterGroupDropdown from './FilterGroupDropdown'

export default function MentorsFilters(props) {
  const defaultProps = {
    tags: [],
    allowSponsors: true,
  }

  const {
    tags: selectedTags,
    onChange: onChangeTags,
    allowSponsors,
  } = { ...defaultProps, ...props }

  const TAG_ALL = 'All'

  useEffect(() => {
    if (window?.location?.hash?.startsWith('#tags:')) {
      let data = window?.location?.hash.split(':')
      let newTags = data[1] ? data[1].split('|').map((t) => decodeURI(t)) : []
      newTags = newTags.filter(
        (item) => allFilters.tags.includes(item) || allFilters.sponsors.includes(item)
      )

      onChangeTags(newTags)

      if (newTags.length > 0) {
        analytics.event('Landed With Selected Tags', {
          tags: newTags,
        })
      }
    }
  }, [])

  const onClickTag = (tag) => {
    let newTags = []

    if (tag === TAG_ALL) {
      analytics.event('Filter Reset Tags')
    } else if (selectedTags.includes(tag)) {
      newTags = selectedTags.filter((item) => item !== tag)

      analytics.event('Filter Removed Tag', {
        tagName: tag,
        sponsored: allFilters.sponsors.includes(tag),
      })
    } else {
      newTags = [...selectedTags, tag]

      analytics.event('Filter Added Tag', {
        tagName: tag,
        sponsored: allFilters.sponsors.includes(tag),
      })
    }

    onChangeTags(newTags)
    history.replaceState(null, null, '#tags:' + newTags.join('|'))
  }

  return (
    <div className="text-center">
      <ul className="flex flex-wrap justify-center -m-1 mb-3">
        {[TAG_ALL].map((tag) => {
          const isActive = tag !== TAG_ALL ? selectedTags.includes(tag) : selectedTags.length === 0

          return (
            <li
              className={classNames('text-sm rounded-full py-1 px-4 m-1 cursor-pointer', {
                'bg-gray-300 hover:bg-gray-200 text-gray-600': !isActive,
                'bg-gray-700 text-white': isActive,
              })}
              key={tag}
              onClick={() => onClickTag(tag)}
            >
              {tag}
            </li>
          )
        })}

        {allowSponsors && (
          <>
            {allFilters.sponsors.map((tag) => {
              const isActive =
                tag !== TAG_ALL ? selectedTags.includes(tag) : selectedTags.length === 0

              return (
                <li
                  className={classNames('text-sm rounded-full py-1 px-4 m-1 cursor-pointer', {
                    'bg-indigo-200 hover:bg-indigo-300 text-gray-600': !isActive,
                    'bg-indigo-700 text-white': isActive,
                  })}
                  key={tag}
                  onClick={() => onClickTag(tag)}
                >
                  {tag}
                </li>
              )
            })}
          </>
        )}

        <li>
          <FilterGroupDropdown
            title="Development"
            values={allFilters.t.development}
            onFilterSelect={onClickTag}
            allSelectedValues={selectedTags}
          />
        </li>

        <li>
          <FilterGroupDropdown
            title="Management"
            values={allFilters.t.management}
            onFilterSelect={onClickTag}
            allSelectedValues={selectedTags}
          />
        </li>

        <li>
          <FilterGroupDropdown
            title="DevOps"
            values={allFilters.t.ops}
            onFilterSelect={onClickTag}
            allSelectedValues={selectedTags}
          />
        </li>

        <li>
          <FilterGroupDropdown
            title="HR"
            values={allFilters.t.hr}
            onFilterSelect={onClickTag}
            allSelectedValues={selectedTags}
          />
        </li>

        <li>
          <FilterGroupDropdown
            title="Marketing"
            values={allFilters.t.marketing}
            onFilterSelect={onClickTag}
            allSelectedValues={selectedTags}
          />
        </li>

        {allFilters.t.rest.map((tag) => {
          const isActive = tag !== TAG_ALL ? selectedTags.includes(tag) : selectedTags.length === 0

          return (
            <li
              className={classNames('text-sm rounded-full py-1 px-4 m-1 cursor-pointer', {
                'bg-gray-300 hover:bg-gray-200 text-gray-600': !isActive,
                'bg-gray-700 text-white': isActive,
              })}
              key={tag}
              onClick={() => onClickTag(tag)}
            >
              {tag}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
