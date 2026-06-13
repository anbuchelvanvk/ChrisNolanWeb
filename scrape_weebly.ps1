$urls = @(
  'https://70mmfilmcellar.weebly.com/interstellar.html',
  'https://70mmfilmcellar.weebly.com/batman-begins.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight.html',
  'https://70mmfilmcellar.weebly.com/the-dark-knight-rises.html',
  'https://70mmfilmcellar.weebly.com/dunkirk.html',
  'https://70mmfilmcellar.weebly.com/inception.html',
  'https://70mmfilmcellar.weebly.com/tenet.html',
  'https://70mmfilmcellar.weebly.com/oppenheimer.html'
)

$results = @()
$pattern = "(?:src|href)=['""](/uploads/[^'""]+\.(?:jpg|png|jpeg)[^'""]*)['""]"

foreach ($url in $urls) {
  $movieName = $url.Split('/')[-1].Replace('.html', '').Replace('-', ' ').ToUpper()
  try {
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
    
    $matches = [regex]::Matches($html, $pattern, "IgnoreCase")
    $count = 0
    $seen = @{}
    
    foreach ($match in $matches) {
      if ($count -ge 6) { break }
      
      $imgUrl = $match.Groups[1].Value
      if ($imgUrl -match 'logo') { continue }
      
      $imgUrl = $imgUrl.Split('?')[0].Replace('_orig', '')
      if ($imgUrl.StartsWith('/')) {
        $imgUrl = "https://70mmfilmcellar.weebly.com$imgUrl"
      }
      
      if (-not $seen.ContainsKey($imgUrl)) {
        $seen[$imgUrl] = $true
        $results += [pscustomobject]@{
          movie = $movieName
          url = $imgUrl
          title = "$movieName - Cell $($count + 1)"
        }
        $count++
      }
    }
  } catch {
    Write-Host "Error fetching $url"
  }
}

$results | ConvertTo-Json -Depth 5 | Out-File 'weebly_scans.json' -Encoding utf8
Write-Host "Saved $($results.Count) scans."
