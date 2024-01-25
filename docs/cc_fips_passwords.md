---
title: Password Configuration
sidebar_label: Password Configuration
---

he authorized administrator is associated with a defined login class, and the administrator is assigned with all permissions. Data is stored locally for fixed password authentication.

NOTE: We recommend that you not use control characters in passwords.
Use the following guidelines and configuration options for passwords and when selecting passwords for authorized administrator accounts. Passwords should be:

Easy to remember so that users are not tempted to write it down.
Changed periodically.
Private and not shared with anyone.
Contain a minimum of 10 characters. The minimum password length is 10 characters.
content_copy zoom_out_map
[ edit ]
administrator@host# set system login password minimum-length 10
Include both alphanumeric and punctuation characters, composed of any combination of upper and lowercase letters, numbers, and special characters such as, “!”, “@”, “#”, “$”, “%”, “^”, “&”, “*”, “(“, and “)”. There should be at least a change in one case, one or more digits, and one or more punctuation marks.
Contain character sets. Valid character sets include uppercase letters, lowercase letters, numbers, punctuation, and other special characters.
content_copy zoom_out_map
[ edit ]
administrator@host# set system login password change-type character-sets
Contain the minimum number of character sets or character set changes. The minimum number of character sets required in plain-text passwords in Junos FIPS is 2.
content_copy zoom_out_map
[ edit ]
administrator@host# set system login password minimum-changes 2
NOTE: The authentication algorithm for plain-text passwords must be configured as sha256.
content_copy zoom_out_map
[ edit ]
administrator@host# set system login password format sha256
When you change the password algorithm to SHA256, change even the user password. Until then, the old hash algorithm is used.

Weak passwords are:

Words that might be found in or exist as a permuted form in a system file such as /etc/passwd.
The hostname of the system (always a first guess).
Any words appearing in a dictionary. This includes dictionaries other than English, and words found in works such as Shakespeare, Lewis Carroll, Roget's Thesaurus, and so on. This prohibition includes common words and phrases from sports, sayings, movies, and television shows.
Permutations on any of the above. For example, a dictionary word with vowels replaced with digits (for example f00t) or with digits added to the end.
Any machine-generated passwords. Algorithms reduce the search space of password-guessing programs and so should not be used.
Strong reusable passwords can be based on letters from a favorite phrase or word, and then concatenated with other, unrelated words, along with additional digits and punctuation.

NOTE: Passwords should be changed periodically.