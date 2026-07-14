// data/dsa/details-strings.js — worked solutions for the Strings phase.
// Original explanations and implementations of standard algorithms.
// Shape: { [problemId]: { statement, examples?, approaches[], oneLiner?, similar? } }

export const DETAILS = {
  "reverse-string": {
    statement: "Reverse a string given as a char array, modifying it in place with O(1) extra memory.",
    examples: [{ input: "s = ['h','e','l','l','o']", output: "['o','l','l','e','h']" }],
    approaches: [
      { name: "Optimal", pattern: "Two Pointers (swap ends)", theory: "Point one index at each end of the array and swap the characters they hold, walking both inward until they meet. Every character moves exactly once.", code: ["public void reverseString(char[] s) {", "    int l = 0, r = s.length - 1;", "    while (l < r) {", "        char t = s[l];", "        s[l++] = s[r];", "        s[r--] = t;", "    }", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Swap the outermost pair and walk two pointers inward until they cross. O(n), O(1).",
    similar: [["344", "Reverse String", "Two Pointers"], ["541", "Reverse String II", "Two Pointers"], ["557", "Reverse Words III", "Two Pointers"]]
  },

  "valid-anagram": {
    statement: "Decide whether string t can be formed by rearranging exactly the letters of string s.",
    examples: [
      { input: "s = \"listen\", t = \"silent\"", output: "true" },
      { input: "s = \"rat\", t = \"car\"", output: "false" }
    ],
    approaches: [
      { name: "Better", pattern: "Sort both", theory: "Anagrams become identical once sorted, so sort both char arrays and compare them.", code: ["public boolean isAnagram(String s, String t) {", "    char[] a = s.toCharArray(), b = t.toCharArray();", "    Arrays.sort(a); Arrays.sort(b);", "    return Arrays.equals(a, b);", "}"], time: "O(n log n)", space: "O(n)" },
      { name: "Optimal", pattern: "Frequency array", theory: "Count each letter up for s and down for t in a single int[26]. If lengths match and no counter ever goes negative (or all end at zero), the strings use the same multiset of letters.", code: ["public boolean isAnagram(String s, String t) {", "    if (s.length() != t.length()) return false;", "    int[] cnt = new int[26];", "    for (int i = 0; i < s.length(); i++) {", "        cnt[s.charAt(i) - 'a']++;", "        cnt[t.charAt(i) - 'a']--;", "    }", "    for (int c : cnt) if (c != 0) return false;", "    return true;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "One int[26]: increment for s, decrement for t; every counter must end at zero. O(n), O(1).",
    similar: [["242", "Valid Anagram", "Counting"], ["49", "Group Anagrams", "HashMap"], ["438", "Find All Anagrams", "Sliding Window"]]
  },

  "valid-palindrome": {
    statement: "Return true if a sentence reads the same forwards and backwards once you ignore case and drop every character that is not a letter or digit.",
    examples: [
      { input: "s = \"No lemon, no melon\"", output: "true" },
      { input: "s = \"hello\"", output: "false" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Two Pointers (skip non-alphanumeric)", theory: "Walk pointers from both ends. Each pointer skips past punctuation and spaces; when both rest on real characters, compare them lowercased. Any mismatch fails immediately.", code: ["public boolean isPalindrome(String s) {", "    int l = 0, r = s.length() - 1;", "    while (l < r) {", "        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;", "        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;", "        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))", "            return false;", "        l++; r--;", "    }", "    return true;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Two pointers from the ends, skipping non-alphanumerics and comparing lowercased chars. O(n), O(1).",
    similar: [["125", "Valid Palindrome", "Two Pointers"], ["680", "Valid Palindrome II", "Two Pointers"], ["5", "Longest Palindromic Substring", "Expand Center"]]
  },

  "roman-to-integer": {
    statement: "Convert a Roman numeral string into its integer value, honoring the subtractive pairs like IV (4) and CM (900).",
    examples: [
      { input: "s = \"XIV\"", output: "14" },
      { input: "s = \"MCMXCIV\"", output: "1994" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Left-to-right with lookahead", theory: "Map each symbol to its value. Scan left to right: if a symbol is smaller than the one after it, it is subtractive (IV, IX, XL, ...), so subtract it; otherwise add it.", code: ["public int romanToInt(String s) {", "    int[] val = new int[26];", "    val['I' - 'A'] = 1;    val['V' - 'A'] = 5;", "    val['X' - 'A'] = 10;   val['L' - 'A'] = 50;", "    val['C' - 'A'] = 100;  val['D' - 'A'] = 500;", "    val['M' - 'A'] = 1000;", "    int total = 0;", "    for (int i = 0; i < s.length(); i++) {", "        int cur = val[s.charAt(i) - 'A'];", "        if (i + 1 < s.length() && cur < val[s.charAt(i + 1) - 'A'])", "            total -= cur;      // subtractive pair", "        else", "            total += cur;", "    }", "    return total;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "s = \"XIV\"", headers: ["char", "value", "next is larger?", "total"], rows: [["X", "10", "no (I=1)", "10"], ["I", "1", "yes (V=5) → subtract", "9"], ["V", "5", "— (last)", "14"]] } }
    ],
    oneLiner: "Add each symbol's value, but subtract it when the next symbol is larger. O(n), O(1)."
  },

  "longest-common-prefix": {
    statement: "Given an array of strings, return the longest prefix shared by all of them (empty string if none).",
    examples: [{ input: "strs = [\"interspace\",\"interstellar\",\"internet\"]", output: "\"inter\"" }],
    approaches: [
      { name: "Optimal", pattern: "Horizontal shrinking", theory: "Start with the first string as the candidate prefix. For each following string, chop characters off the candidate's end until it is a real prefix of that string. Whatever survives all strings is the answer.", code: ["public String longestCommonPrefix(String[] strs) {", "    String prefix = strs[0];", "    for (int i = 1; i < strs.length; i++) {", "        while (!strs[i].startsWith(prefix))", "            prefix = prefix.substring(0, prefix.length() - 1);", "        if (prefix.isEmpty()) return \"\";", "    }", "    return prefix;", "}"], time: "O(total chars)", space: "O(1)" }
    ],
    oneLiner: "Keep a candidate prefix and shrink it until every string starts with it. O(sum of lengths)."
  },

  "first-unique-character-in-a-string": {
    statement: "Return the index of the first character in the string that occurs exactly once, or −1 if every character repeats.",
    examples: [{ input: "s = \"swiss\"", output: "1", explanation: "'w' is the first letter that appears only once." }],
    approaches: [
      { name: "Optimal", pattern: "Two-pass frequency count", theory: "First pass counts every letter in an int[26]. Second pass rescans in order and returns the first index whose letter has count 1.", code: ["public int firstUniqChar(String s) {", "    int[] cnt = new int[26];", "    for (char c : s.toCharArray()) cnt[c - 'a']++;", "    for (int i = 0; i < s.length(); i++)", "        if (cnt[s.charAt(i) - 'a'] == 1) return i;", "    return -1;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Count all letters, then rescan for the first with count 1. Two passes, O(n), O(1)."
  },

  "isomorphic-strings": {
    statement: "Two strings are isomorphic if characters of one can be consistently substituted to produce the other, with no two characters mapping to the same target. Decide if s and t are isomorphic.",
    examples: [
      { input: "s = \"moon\", t = \"look\"", output: "true", explanation: "m→l, o→o, n→k is a consistent one-to-one mapping." },
      { input: "s = \"foo\", t = \"bar\"", output: "false", explanation: "o would need to map to both a and r." }
    ],
    approaches: [
      { name: "Optimal", pattern: "Parallel last-seen positions", theory: "Track the last position (plus 1) where each character appeared, one table per string. At every index, the two current characters must have identical history — if their last-seen positions ever differ, the mapping breaks.", code: ["public boolean isIsomorphic(String s, String t) {", "    int[] lastS = new int[256], lastT = new int[256];", "    for (int i = 0; i < s.length(); i++) {", "        if (lastS[s.charAt(i)] != lastT[t.charAt(i)]) return false;", "        lastS[s.charAt(i)] = i + 1;", "        lastT[t.charAt(i)] = i + 1;", "    }", "    return true;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Record where each char was last seen in both strings; paired chars must always share the same history. O(n).",
    similar: [["205", "Isomorphic Strings", "Mapping"], ["290", "Word Pattern", "Mapping"]]
  },

  "ransom-note": {
    statement: "Return true if the ransom note can be assembled from the magazine's letters, using each magazine letter at most once.",
    examples: [{ input: "ransomNote = \"aab\", magazine = \"baab\"", output: "true" }],
    approaches: [
      { name: "Optimal", pattern: "Frequency array (budget)", theory: "Count the magazine's letters into an int[26] budget. Spend from the budget for each note letter; if any counter dips below zero, the magazine ran out of that letter.", code: ["public boolean canConstruct(String ransomNote, String magazine) {", "    int[] cnt = new int[26];", "    for (char c : magazine.toCharArray()) cnt[c - 'a']++;", "    for (char c : ransomNote.toCharArray())", "        if (--cnt[c - 'a'] < 0) return false;", "    return true;", "}"], time: "O(m + n)", space: "O(1)" }
    ],
    oneLiner: "Count magazine letters, then decrement per note letter; a negative counter means impossible. O(m+n)."
  },

  "implement-strstr": {
    statement: "Return the index of the first occurrence of needle inside haystack, or −1 if needle never appears.",
    examples: [
      { input: "haystack = \"sadbutsad\", needle = \"but\"", output: "3" },
      { input: "haystack = \"abc\", needle = \"x\"", output: "-1" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Sliding compare", theory: "Try each alignment i of the needle over the haystack and compare character by character; the first alignment that matches fully is the answer. Simple and fine for interview-size inputs.", code: ["public int strStr(String haystack, String needle) {", "    int n = haystack.length(), m = needle.length();", "    for (int i = 0; i + m <= n; i++) {", "        int j = 0;", "        while (j < m && haystack.charAt(i + j) == needle.charAt(j)) j++;", "        if (j == m) return i;", "    }", "    return -1;", "}"], time: "O(n·m)", space: "O(1)" }
    ],
    oneLiner: "Check every alignment of needle over haystack char by char. O(n·m); KMP's failure table brings it to O(n+m) if asked."
  },

  "detect-capital": {
    statement: "A word uses capitals correctly if it is ALL CAPS, all lowercase, or only the first letter is capitalized. Verify a given word.",
    examples: [
      { input: "word = \"NASA\"", output: "true" },
      { input: "word = \"GooD\"", output: "false" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Count uppercase letters", theory: "Count the uppercase letters once. Valid iff the count equals the length (all caps), equals zero (all lowercase), or equals one with that capital sitting at index 0 (Title case).", code: ["public boolean detectCapitalUse(String word) {", "    int upper = 0;", "    for (char c : word.toCharArray())", "        if (Character.isUpperCase(c)) upper++;", "    return upper == word.length()", "        || upper == 0", "        || (upper == 1 && Character.isUpperCase(word.charAt(0)));", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Count capitals: valid when all, none, or exactly one at the front. O(n)."
  },

  "reverse-words-in-a-string-iii": {
    statement: "Reverse the characters inside each word of a sentence while keeping the words themselves in their original order.",
    examples: [{ input: "s = \"keep it simple\"", output: "\"peek ti elpmis\"" }],
    approaches: [
      { name: "Optimal", pattern: "Two Pointers per word", theory: "Work on the char array. Track the start of the current word; whenever a space (or the end) is reached, reverse the slice [start, i−1] in place, then move start past the space.", code: ["public String reverseWords(String s) {", "    char[] a = s.toCharArray();", "    int start = 0;", "    for (int i = 0; i <= a.length; i++) {", "        if (i == a.length || a[i] == ' ') {", "            reverse(a, start, i - 1);", "            start = i + 1;", "        }", "    }", "    return new String(a);", "}", "private void reverse(char[] a, int l, int r) {", "    while (l < r) { char t = a[l]; a[l++] = a[r]; a[r--] = t; }", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Find each word's boundaries and reverse that slice in place with two pointers. O(n)."
  },

  "length-of-last-word": {
    statement: "Return the length of the final word in a string that may end with trailing spaces.",
    examples: [{ input: "s = \"roadmap tracker app  \"", output: "3" }],
    approaches: [
      { name: "Optimal", pattern: "Scan from the end", theory: "Walk backwards past any trailing spaces, then keep counting characters until the next space or the start of the string.", code: ["public int lengthOfLastWord(String s) {", "    int i = s.length() - 1, len = 0;", "    while (i >= 0 && s.charAt(i) == ' ') i--;   // skip trailing spaces", "    while (i >= 0 && s.charAt(i) != ' ') { len++; i--; }", "    return len;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "From the back: skip spaces, then count until the previous space. O(n), O(1)."
  },

  "longest-substring-without-repeating-characters": {
    statement: "Find the length of the longest stretch of consecutive characters in a string that contains no character twice.",
    examples: [
      { input: "s = \"planner\"", output: "4", explanation: "\"plan\" has no repeats; the second n breaks the run." },
      { input: "s = \"aaaa\"", output: "1" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Try every start", theory: "From every start index, extend to the right adding characters to a set until a repeat appears; record the longest run. Quadratic because each start rescans its suffix.", code: ["public int lengthOfLongestSubstring(String s) {", "    int best = 0;", "    for (int i = 0; i < s.length(); i++) {", "        Set<Character> seen = new HashSet<>();", "        int j = i;", "        while (j < s.length() && seen.add(s.charAt(j))) j++;", "        best = Math.max(best, j - i);", "    }", "    return best;", "}"], time: "O(n²)", space: "O(min(n, alphabet))" },
      { name: "Optimal", pattern: "Sliding Window + last index", theory: "Keep a window [left, r] that never holds a duplicate. Remember the last index of every character; when the incoming character was already seen inside the window, jump left to just past its previous position. Each pointer only moves forward, so one pass suffices.", code: ["public int lengthOfLongestSubstring(String s) {", "    int[] last = new int[256];", "    Arrays.fill(last, -1);", "    int best = 0, left = 0;", "    for (int r = 0; r < s.length(); r++) {", "        char c = s.charAt(r);", "        if (last[c] >= left) left = last[c] + 1;   // repeat inside window", "        last[c] = r;", "        best = Math.max(best, r - left + 1);", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "s = \"planner\"", headers: ["r", "char", "left", "window", "best"], rows: [["0", "p", "0", "p", "1"], ["1", "l", "0", "pl", "2"], ["2", "a", "0", "pla", "3"], ["3", "n", "0", "plan", "4"], ["4", "n", "4 (repeat → jump)", "n", "4"], ["5", "e", "4", "ne", "4"]] } }
    ],
    oneLiner: "Sliding window with a last-seen-index table: on a repeat, snap left past the previous occurrence; track the widest window. O(n), O(1).",
    similar: [["3", "Longest Substring No Repeat", "Sliding Window"], ["424", "Longest Repeating Char Replacement", "Sliding Window"], ["76", "Minimum Window Substring", "Sliding Window"]]
  },

  "longest-palindromic-substring": {
    statement: "Return the longest contiguous palindrome inside a string.",
    examples: [{ input: "s = \"banana\"", output: "\"anana\"" }],
    approaches: [
      { name: "Brute Force", pattern: "Check all substrings", theory: "Test every substring for being a palindrome and keep the longest. n² substrings times O(n) checks is cubic — only useful as a baseline.", code: ["// for every (i, j) pair, verify s[i..j] is a palindrome; keep the longest"], time: "O(n³)", space: "O(1)" },
      { name: "Optimal", pattern: "Expand Around Center", theory: "Every palindrome has a center: a single character (odd length) or a gap between two characters (even length). For each of the 2n−1 centers, expand outward while the ends match, and remember the longest expansion.", code: ["public String longestPalindrome(String s) {", "    int start = 0, len = 0;", "    for (int i = 0; i < s.length(); i++) {", "        int odd = expand(s, i, i);", "        int even = expand(s, i, i + 1);", "        int m = Math.max(odd, even);", "        if (m > len) {", "            len = m;", "            start = i - (m - 1) / 2;", "        }", "    }", "    return s.substring(start, start + len);", "}", "private int expand(String s, int l, int r) {", "    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {", "        l--; r++;", "    }", "    return r - l - 1;   // final matched length", "}"], time: "O(n²)", space: "O(1)" }
    ],
    oneLiner: "Expand around all 2n−1 centers (each char and each gap), keeping the longest matched span. O(n²), O(1).",
    similar: [["5", "Longest Palindromic Substring", "Expand Center"], ["647", "Palindromic Substrings", "Expand Center"], ["516", "Longest Palindromic Subsequence", "DP"]]
  },

  "group-anagrams": {
    statement: "Group the words of an array so that every group contains exactly the words that are anagrams of each other.",
    examples: [{ input: "strs = [\"pots\",\"stop\",\"tops\",\"cat\",\"act\",\"dog\"]", output: "[[\"pots\",\"stop\",\"tops\"],[\"cat\",\"act\"],[\"dog\"]]" }],
    approaches: [
      { name: "Better", pattern: "Sorted string as key", theory: "Anagrams collapse to the same string once their letters are sorted, so use that sorted form as a HashMap key and append each original word to its bucket.", code: ["public List<List<String>> groupAnagrams(String[] strs) {", "    Map<String, List<String>> groups = new HashMap<>();", "    for (String s : strs) {", "        char[] a = s.toCharArray();", "        Arrays.sort(a);", "        groups.computeIfAbsent(new String(a), k -> new ArrayList<>()).add(s);", "    }", "    return new ArrayList<>(groups.values());", "}"], time: "O(n · k log k)", space: "O(n · k)", dryRun: { title: "strs = [\"pots\",\"stop\",\"tan\",\"opts\"]", headers: ["word", "sorted key", "groups after"], rows: [["pots", "opst", "{opst:[pots]}"], ["stop", "opst", "{opst:[pots,stop]}"], ["tan", "ant", "{opst:[...], ant:[tan]}"], ["opts", "opst", "{opst:[pots,stop,opts], ant:[tan]}"]] } },
      { name: "Optimal", pattern: "Character-count key", theory: "Instead of sorting, build the key from the 26 letter counts (joined with a separator so counts can't blur together). Building the key is linear in the word length, dropping the log factor.", code: ["public List<List<String>> groupAnagrams(String[] strs) {", "    Map<String, List<String>> groups = new HashMap<>();", "    for (String s : strs) {", "        int[] cnt = new int[26];", "        for (char c : s.toCharArray()) cnt[c - 'a']++;", "        StringBuilder key = new StringBuilder();", "        for (int n : cnt) key.append(n).append('#');", "        groups.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(s);", "    }", "    return new ArrayList<>(groups.values());", "}"], time: "O(n · k)", space: "O(n · k)" }
    ],
    oneLiner: "Bucket words in a HashMap under a canonical key — sorted letters, or better, the 26-letter count signature. O(n·k).",
    similar: [["49", "Group Anagrams", "HashMap"], ["242", "Valid Anagram", "Counting"], ["438", "Find All Anagrams", "Sliding Window"]]
  },

  "string-compression": {
    statement: "Compress a char array in place by replacing each run of a repeated character with the character followed by its count (counts of 1 are omitted); return the compressed length.",
    examples: [{ input: "chars = ['a','a','b','b','b','c']", output: "5", explanation: "Array becomes ['a','2','b','3','c']." }],
    approaches: [
      { name: "Optimal", pattern: "Read/write pointers", theory: "A read pointer measures each run of equal characters; a write pointer lays down the character and, when the run is longer than 1, the digits of its count. Writing never overtakes reading, so it is safe in place.", code: ["public int compress(char[] chars) {", "    int write = 0, read = 0;", "    while (read < chars.length) {", "        char c = chars[read];", "        int count = 0;", "        while (read < chars.length && chars[read] == c) {", "            read++; count++;", "        }", "        chars[write++] = c;", "        if (count > 1)", "            for (char d : String.valueOf(count).toCharArray())", "                chars[write++] = d;", "    }", "    return write;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Measure each run with a read pointer, emit char + count digits with a write pointer. O(n), in place."
  },

  "decode-string": {
    statement: "Expand an encoded string where k[inner] means the inner part repeats k times; encodings may nest. Return the decoded string.",
    examples: [
      { input: "s = \"3[ab]\"", output: "\"ababab\"" },
      { input: "s = \"2[x3[y]]\"", output: "\"xyyyxyyy\"" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Two stacks (counts + builders)", theory: "Scan once. Digits accumulate into a number. An opening bracket pushes the pending count and the string built so far, then starts fresh. A closing bracket pops both and appends the finished inner block count-many times onto the outer string. Nesting is handled naturally by the stacks.", code: ["public String decodeString(String s) {", "    Deque<Integer> counts = new ArrayDeque<>();", "    Deque<StringBuilder> parts = new ArrayDeque<>();", "    StringBuilder cur = new StringBuilder();", "    int num = 0;", "    for (char c : s.toCharArray()) {", "        if (Character.isDigit(c)) {", "            num = num * 10 + (c - '0');", "        } else if (c == '[') {", "            counts.push(num);", "            parts.push(cur);", "            num = 0;", "            cur = new StringBuilder();", "        } else if (c == ']') {", "            StringBuilder inner = cur;", "            cur = parts.pop();", "            int k = counts.pop();", "            while (k-- > 0) cur.append(inner);", "        } else {", "            cur.append(c);", "        }", "    }", "    return cur.toString();", "}"], time: "O(output length)", space: "O(output length)" }
    ],
    oneLiner: "Push (count, prefix) on '[', pop and repeat-append on ']' — two stacks decode arbitrary nesting in one pass.",
    similar: [["394", "Decode String", "Stack"], ["20", "Valid Parentheses", "Stack"], ["726", "Number of Atoms", "Stack"]]
  },

  "minimum-window-substring": {
    statement: "Find the shortest substring of s that contains every character of t, with multiplicity. Return the empty string if no such window exists.",
    examples: [{ input: "s = \"ZABXCB\", t = \"ABC\"", output: "\"ABXC\"" }],
    approaches: [
      { name: "Brute Force", pattern: "Check all substrings", theory: "For every substring of s, count its characters and check whether they cover t; keep the shortest that does. Correct but hopeless beyond tiny inputs.", code: ["// for every (i, j): build a count of s[i..j] and compare against t's counts"], time: "O(n² · Σ)", space: "O(Σ)" },
      { name: "Optimal", pattern: "Sliding Window (need / missing)", theory: "Store how many of each character t still needs. Grow the right edge; whenever a character actually reduces the outstanding need, decrement 'missing'. Once missing hits zero the window is valid — shrink from the left as far as possible, recording the best, until some character becomes needed again.", code: ["public String minWindow(String s, String t) {", "    if (t.length() > s.length()) return \"\";", "    int[] need = new int[128];", "    for (char c : t.toCharArray()) need[c]++;", "    int missing = t.length(), left = 0;", "    int bestLen = Integer.MAX_VALUE, bestStart = 0;", "    for (int r = 0; r < s.length(); r++) {", "        if (need[s.charAt(r)]-- > 0) missing--;   // useful char", "        while (missing == 0) {                      // valid window: shrink", "            if (r - left + 1 < bestLen) {", "                bestLen = r - left + 1;", "                bestStart = left;", "            }", "            if (++need[s.charAt(left++)] > 0) missing++;", "        }", "    }", "    return bestLen == Integer.MAX_VALUE ? \"\" : s.substring(bestStart, bestStart + bestLen);", "}"], time: "O(n + m)", space: "O(1)", dryRun: { title: "s = \"ZABXCB\", t = \"ABC\"", headers: ["r", "char", "missing after", "left", "best window"], rows: [["0", "Z", "3", "0", "—"], ["1", "A", "2", "0", "—"], ["2", "B", "1", "0", "—"], ["3", "X", "1", "0", "—"], ["4", "C", "0 → shrink", "0→2", "ABXC (len 4)"], ["5", "B", "1", "2", "ABXC"]] } }
    ],
    oneLiner: "Expand right collecting t's characters; when nothing is missing, shrink left while recording the smallest valid window. O(n+m).",
    similar: [["76", "Minimum Window Substring", "Sliding Window"], ["567", "Permutation in String", "Sliding Window"], ["438", "Find All Anagrams", "Sliding Window"]]
  },

  "longest-repeating-character-replacement": {
    statement: "You may change at most k characters of a string of uppercase letters. Return the length of the longest substring you can turn into a single repeated character.",
    examples: [{ input: "s = \"AABAB\", k = 1", output: "4", explanation: "Change the B in \"AABA\" to get \"AAAA\"." }],
    approaches: [
      { name: "Optimal", pattern: "Sliding Window + max frequency", theory: "A window is fixable when (window length − count of its most common letter) ≤ k. Grow the right edge, updating counts and the best frequency seen; if the window becomes unfixable, slide the left edge once. The window never shrinks, so it always holds the best length found.", code: ["public int characterReplacement(String s, int k) {", "    int[] cnt = new int[26];", "    int left = 0, maxFreq = 0, best = 0;", "    for (int r = 0; r < s.length(); r++) {", "        maxFreq = Math.max(maxFreq, ++cnt[s.charAt(r) - 'A']);", "        if (r - left + 1 - maxFreq > k)   // too many changes needed", "            cnt[s.charAt(left++) - 'A']--;", "        best = Math.max(best, r - left + 1);", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Window is valid while length − maxFreq ≤ k; grow right, nudge left when broken, track the widest. O(n), O(1).",
    similar: [["424", "Longest Repeating Char Replacement", "Sliding Window"], ["3", "Longest Substring No Repeat", "Sliding Window"], ["1004", "Max Consecutive Ones III", "Sliding Window"]]
  },

  "partition-labels": {
    statement: "Split a string into as many pieces as possible so that no letter appears in more than one piece; return the piece sizes.",
    examples: [{ input: "s = \"abcabdxyzyx\"", output: "[5,1,5]", explanation: "Pieces: \"abcab\", \"d\", \"xyzyx\"." }],
    approaches: [
      { name: "Optimal", pattern: "Last occurrence + greedy sweep", theory: "Record the last index of every letter. Sweep the string extending the current piece's required end to the furthest last-occurrence seen so far; when the sweep index reaches that end, the piece can be safely cut.", code: ["public List<Integer> partitionLabels(String s) {", "    int[] last = new int[26];", "    for (int i = 0; i < s.length(); i++)", "        last[s.charAt(i) - 'a'] = i;", "    List<Integer> sizes = new ArrayList<>();", "    int start = 0, end = 0;", "    for (int i = 0; i < s.length(); i++) {", "        end = Math.max(end, last[s.charAt(i) - 'a']);", "        if (i == end) {                 // piece closed", "            sizes.add(end - start + 1);", "            start = i + 1;", "        }", "    }", "    return sizes;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "s = \"abcab|d|...\"", headers: ["i", "char", "last[char]", "end", "cut?"], rows: [["0", "a", "3", "3", "no"], ["1", "b", "4", "4", "no"], ["2", "c", "2", "4", "no"], ["3", "a", "3", "4", "no"], ["4", "b", "4", "4", "yes → size 5"]] } }
    ],
    oneLiner: "Precompute each letter's last index; extend the piece to the max last-index seen, cut when i reaches it. O(n)."
  },

  "zigzag-conversion": {
    statement: "Write a string in a zigzag over numRows rows (down a column, then diagonally back up) and read it out row by row.",
    examples: [{ input: "s = \"ABCDEFGHI\", numRows = 3", output: "\"AEIBDFHCG\"" }],
    approaches: [
      { name: "Optimal", pattern: "Row builders with bouncing pointer", theory: "Keep one StringBuilder per row. Walk the string appending each character to the current row while a direction variable moves the row index down; bounce the direction whenever the top or bottom row is hit. Concatenate the rows at the end.", code: ["public String convert(String s, int numRows) {", "    if (numRows == 1) return s;", "    StringBuilder[] rows = new StringBuilder[numRows];", "    for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();", "    int row = 0, dir = -1;", "    for (char c : s.toCharArray()) {", "        rows[row].append(c);", "        if (row == 0 || row == numRows - 1) dir = -dir;   // bounce", "        row += dir;", "    }", "    StringBuilder res = new StringBuilder();", "    for (StringBuilder sb : rows) res.append(sb);", "    return res.toString();", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Simulate the zigzag: append to per-row builders, flipping direction at the top and bottom rows. O(n)."
  },

  "multiply-strings": {
    statement: "Multiply two non-negative integers given as strings and return the product as a string, without converting them to built-in numeric types.",
    examples: [{ input: "num1 = \"23\", num2 = \"45\"", output: "\"1035\"" }],
    approaches: [
      { name: "Optimal", pattern: "Schoolbook digit grid", theory: "The product of digit i of num1 and digit j of num2 lands at positions i+j (carry) and i+j+1 (unit) of the result array of size m+n. Accumulate all pairwise products with carries, then skip leading zeros when building the string.", code: ["public String multiply(String num1, String num2) {", "    if (num1.equals(\"0\") || num2.equals(\"0\")) return \"0\";", "    int m = num1.length(), n = num2.length();", "    int[] digits = new int[m + n];", "    for (int i = m - 1; i >= 0; i--) {", "        for (int j = n - 1; j >= 0; j--) {", "            int prod = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');", "            int sum = prod + digits[i + j + 1];", "            digits[i + j + 1] = sum % 10;", "            digits[i + j] += sum / 10;", "        }", "    }", "    StringBuilder sb = new StringBuilder();", "    for (int d : digits)", "        if (!(sb.length() == 0 && d == 0)) sb.append(d);", "    return sb.toString();", "}"], time: "O(m·n)", space: "O(m+n)" }
    ],
    oneLiner: "Digit i × digit j contributes to slots i+j and i+j+1 of an m+n array; accumulate with carries and strip leading zeros. O(m·n)."
  },

  "regular-expression-matching": {
    statement: "Implement full-string matching where '.' matches any single character and '*' means zero or more copies of the preceding element.",
    examples: [
      { input: "s = \"ab\", p = \".*\"", output: "true", explanation: "\".*\" can absorb the whole string." },
      { input: "s = \"aa\", p = \"a\"", output: "false" }
    ],
    approaches: [
      { name: "Optimal", pattern: "2D DP over prefixes", theory: "dp[i][j] = does s[0..i) match p[0..j)? A '*' either contributes zero copies (drop the pair: dp[i][j−2]) or one more copy when its base matches s's current char (dp[i−1][j]). A literal or '.' consumes one character from both sides (dp[i−1][j−1]).", code: ["public boolean isMatch(String s, String p) {", "    int m = s.length(), n = p.length();", "    boolean[][] dp = new boolean[m + 1][n + 1];", "    dp[0][0] = true;", "    for (int j = 2; j <= n; j++)", "        if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];", "    for (int i = 1; i <= m; i++) {", "        for (int j = 1; j <= n; j++) {", "            char pc = p.charAt(j - 1);", "            if (pc == '*') {", "                dp[i][j] = dp[i][j - 2];               // zero copies", "                char base = p.charAt(j - 2);", "                if (base == '.' || base == s.charAt(i - 1))", "                    dp[i][j] |= dp[i - 1][j];          // one more copy", "            } else if (pc == '.' || pc == s.charAt(i - 1)) {", "                dp[i][j] = dp[i - 1][j - 1];", "            }", "        }", "    }", "    return dp[m][n];", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Prefix DP: '*' is either dropped with its base (dp[i][j−2]) or eats one matching char (dp[i−1][j]); others need dp[i−1][j−1]. O(m·n).",
    similar: [["10", "Regex Matching", "DP"], ["44", "Wildcard Matching", "DP"], ["72", "Edit Distance", "DP"]]
  },

  "wildcard-matching": {
    statement: "Implement full-string matching where '?' matches any one character and '*' matches any sequence of characters, including the empty one.",
    examples: [
      { input: "s = \"grey\", p = \"g*y\"", output: "true" },
      { input: "s = \"cb\", p = \"?a\"", output: "false" }
    ],
    approaches: [
      { name: "Optimal", pattern: "2D DP over prefixes", theory: "dp[i][j] = does s[0..i) match p[0..j)? A '*' either matches nothing (dp[i][j−1]) or swallows one more character of s (dp[i−1][j]). '?' or an equal literal consumes one char from both (dp[i−1][j−1]). A run of leading '*' can match the empty string, which seeds row 0.", code: ["public boolean isMatch(String s, String p) {", "    int m = s.length(), n = p.length();", "    boolean[][] dp = new boolean[m + 1][n + 1];", "    dp[0][0] = true;", "    for (int j = 1; j <= n; j++)", "        if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 1];", "    for (int i = 1; i <= m; i++) {", "        for (int j = 1; j <= n; j++) {", "            char pc = p.charAt(j - 1);", "            if (pc == '*')", "                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];", "            else if (pc == '?' || pc == s.charAt(i - 1))", "                dp[i][j] = dp[i - 1][j - 1];", "        }", "    }", "    return dp[m][n];", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Prefix DP where '*' extends by matching empty (left cell) or one more char (upper cell). O(m·n).",
    similar: [["44", "Wildcard Matching", "DP"], ["10", "Regex Matching", "DP"]]
  },

  "edit-distance": {
    statement: "Compute the minimum number of single-character insertions, deletions, or replacements needed to turn one word into another.",
    examples: [{ input: "word1 = \"kitten\", word2 = \"sitting\"", output: "3", explanation: "k→s, e→i, then insert g." }],
    approaches: [
      { name: "Optimal", pattern: "2D DP (Levenshtein)", theory: "dp[i][j] = cost to convert the first i chars of word1 into the first j chars of word2. Matching last characters cost nothing extra (diagonal); otherwise pay 1 plus the cheapest of replace (diagonal), delete (up), or insert (left). Borders are the costs of building from or to the empty string.", code: ["public int minDistance(String a, String b) {", "    int m = a.length(), n = b.length();", "    int[][] dp = new int[m + 1][n + 1];", "    for (int i = 0; i <= m; i++) dp[i][0] = i;   // delete everything", "    for (int j = 0; j <= n; j++) dp[0][j] = j;   // insert everything", "    for (int i = 1; i <= m; i++) {", "        for (int j = 1; j <= n; j++) {", "            if (a.charAt(i - 1) == b.charAt(j - 1))", "                dp[i][j] = dp[i - 1][j - 1];", "            else", "                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],       // replace", "                               Math.min(dp[i - 1][j],           // delete", "                                        dp[i][j - 1]));         // insert", "        }", "    }", "    return dp[m][n];", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Levenshtein DP: equal chars ride the diagonal free; otherwise 1 + min(replace, delete, insert). O(m·n).",
    similar: [["72", "Edit Distance", "DP"], ["1143", "Longest Common Subsequence", "DP"], ["583", "Delete Operation for Two Strings", "DP"]]
  },

  "text-justification": {
    statement: "Pack words greedily into lines of exactly maxWidth characters, distributing spaces as evenly as possible (extra spaces go to the left gaps); the last line and single-word lines are left-justified and padded on the right.",
    examples: [{ input: "words = [\"the\",\"quick\",\"brown\",\"fox\",\"jumps\"], maxWidth = 11", output: "[\"the   quick\", \"brown   fox\", \"jumps      \"]" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy line packing + space math", theory: "Greedily take as many words as fit assuming one space between them. For a full-justified line, total padding = maxWidth − word characters; each of the g gaps gets padding/g spaces and the first padding%g gaps get one extra. The last line (and any one-word line) instead joins with single spaces and pads the tail.", code: ["public List<String> fullJustify(String[] words, int maxWidth) {", "    List<String> lines = new ArrayList<>();", "    int i = 0;", "    while (i < words.length) {", "        int j = i, lineLen = words[i].length();", "        while (j + 1 < words.length && lineLen + 1 + words[j + 1].length() <= maxWidth) {", "            j++;", "            lineLen += 1 + words[j].length();", "        }", "        StringBuilder line = new StringBuilder();", "        int gaps = j - i;", "        if (j == words.length - 1 || gaps == 0) {   // last line or single word", "            for (int k = i; k <= j; k++) {", "                line.append(words[k]);", "                if (k < j) line.append(' ');", "            }", "            while (line.length() < maxWidth) line.append(' ');", "        } else {", "            int wordChars = lineLen - gaps;", "            int base = (maxWidth - wordChars) / gaps;", "            int extra = (maxWidth - wordChars) % gaps;", "            for (int k = i; k <= j; k++) {", "                line.append(words[k]);", "                if (k < j) {", "                    int pad = base + (k - i < extra ? 1 : 0);", "                    for (int p = 0; p < pad; p++) line.append(' ');", "                }", "            }", "        }", "        lines.add(line.toString());", "        i = j + 1;", "    }", "    return lines;", "}"], time: "O(total chars)", space: "O(total chars)" }
    ],
    oneLiner: "Greedily fill each line, then split the leftover spaces evenly across gaps with the remainder going left; last line is left-justified. O(n)."
  }
};
